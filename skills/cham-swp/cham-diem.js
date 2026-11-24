#!/usr/bin/env node
// CLI chấm điểm SWP cho một issue: đọc mô tả (tiêu đề + nội dung) → Scope + Complexity → SWP + giờ.
// Tất định: cùng input (và cùng cờ ghi đè nếu có) luôn ra cùng kết quả — không gọi mạng, không
// gọi LLM, không Math.random. Xem ma-tran-diem.js cho định nghĩa ma trận, phan-loai-tu-khoa.js
// cho quy tắc khớp từ khoá.

"use strict";

const fs = require("fs");
const path = require("path");
const {
  SCOPE_LEVELS,
  COMPLEXITY_LEVELS,
  HE_SO_GIO_MOI_SWP,
  tinhSWP,
  tinhGio,
} = require("./ma-tran-diem");
const { phanLoaiScope, phanLoaiComplexity } = require("./phan-loai-tu-khoa");

function docCoCau(argv) {
  const ketQua = {
    file: null,
    title: null,
    body: null,
    scopeGhiDe: null,
    complexityGhiDe: null,
    lyDoGhiDe: null,
    outJson: null,
    outMd: null,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const co = argv[i];
    const giaTri = argv[i + 1];
    if (co === "--file") { ketQua.file = giaTri; i += 1; }
    else if (co === "--title") { ketQua.title = giaTri; i += 1; }
    else if (co === "--body") { ketQua.body = giaTri; i += 1; }
    else if (co === "--scope") { ketQua.scopeGhiDe = giaTri; i += 1; }
    else if (co === "--complexity") { ketQua.complexityGhiDe = giaTri; i += 1; }
    else if (co === "--ly-do-ghi-de") { ketQua.lyDoGhiDe = giaTri; i += 1; }
    else if (co === "--out-json") { ketQua.outJson = giaTri; i += 1; }
    else if (co === "--out-md") { ketQua.outMd = giaTri; i += 1; }
  }
  return ketQua;
}

// Issue mẫu dạng markdown: dòng `# Tiêu đề` đầu tiên là title, phần còn lại là body.
function tachTitleBody(noiDungFile) {
  const dong = noiDungFile.split(/\r?\n/);
  let title = "";
  let batDauBody = 0;
  for (let i = 0; i < dong.length; i += 1) {
    if (dong[i].trim().startsWith("#")) {
      title = dong[i].replace(/^#+\s*/, "").trim();
      batDauBody = i + 1;
      break;
    }
  }
  const body = dong.slice(batDauBody).join("\n").trim();
  return { title, body };
}

function xayDungLyDo(ketQuaScope, ketQuaComplexity, swp, gio, override) {
  const dong = [];
  const scopeDef = SCOPE_LEVELS[ketQuaScope.level];
  const cxDef = COMPLEXITY_LEVELS[ketQuaComplexity.level];

  dong.push(`Scope = ${scopeDef.ma} (${scopeDef.nhan}).`);
  if (override.scope) {
    dong.push(`  → Ghi đè thủ công, lý do: ${override.lyDo || "(không ghi lý do)"}.`);
  } else if (ketQuaScope.laMacDinh) {
    dong.push("  → Không khớp từ khoá nào, dùng mức mặc định.");
  } else {
    dong.push(`  → Khớp từ khoá: ${ketQuaScope.matchedSignals.join(", ")}.`);
  }
  dong.push(`  → Đối chiếu ví dụ LAB-4: ${scopeDef.viDuThat}`);

  dong.push(`Complexity = ${cxDef.ma} (${cxDef.nhan}).`);
  if (override.complexity) {
    dong.push(`  → Ghi đè thủ công, lý do: ${override.lyDo || "(không ghi lý do)"}.`);
  } else if (ketQuaComplexity.laMacDinh) {
    dong.push("  → Không khớp từ khoá nào, dùng mức mặc định.");
  } else {
    dong.push(`  → Khớp từ khoá: ${ketQuaComplexity.matchedSignals.join(", ")}.`);
  }
  dong.push(`  → Đối chiếu ví dụ LAB-4: ${cxDef.viDuThat}`);

  dong.push(`Tra ma trận ô (${scopeDef.ma} × ${cxDef.ma}) → SWP = ${swp}.`);
  dong.push(`Quy đổi giờ: ${swp} SWP × ${HE_SO_GIO_MOI_SWP} giờ/SWP = ${gio} giờ.`);
  return dong.join("\n");
}

function chamMotIssue(tieuDe, noiDung, co) {
  const vanBanGop = `${tieuDe}\n${noiDung}`;
  const ketQuaScopeTuDong = phanLoaiScope(vanBanGop);
  const ketQuaComplexityTuDong = phanLoaiComplexity(vanBanGop);

  const coGhiDeScope = Boolean(co.scopeGhiDe);
  const coGhiDeComplexity = Boolean(co.complexityGhiDe);

  const mucScope = coGhiDeScope ? co.scopeGhiDe.toUpperCase() : ketQuaScopeTuDong.level;
  const mucComplexity = coGhiDeComplexity
    ? co.complexityGhiDe.toUpperCase()
    : ketQuaComplexityTuDong.level;

  const swp = tinhSWP(mucScope, mucComplexity);
  const gio = tinhGio(swp);

  const ketQuaScopeHienThi = coGhiDeScope
    ? { level: mucScope, matchedSignals: [], laMacDinh: false }
    : ketQuaScopeTuDong;
  const ketQuaComplexityHienThi = coGhiDeComplexity
    ? { level: mucComplexity, matchedSignals: [], laMacDinh: false }
    : ketQuaComplexityTuDong;

  const lyDo = xayDungLyDo(ketQuaScopeHienThi, ketQuaComplexityHienThi, swp, gio, {
    scope: coGhiDeScope,
    complexity: coGhiDeComplexity,
    lyDo: co.lyDoGhiDe,
  });

  return {
    tieuDe,
    scope: { ma: mucScope, nhan: SCOPE_LEVELS[mucScope].nhan, ghiDe: coGhiDeScope },
    complexity: {
      ma: mucComplexity,
      nhan: COMPLEXITY_LEVELS[mucComplexity].nhan,
      ghiDe: coGhiDeComplexity,
    },
    swp,
    gio,
    lyDo,
  };
}

function main() {
  const co = docCoCau(process.argv.slice(2));
  let tieuDe = co.title || "";
  let noiDung = co.body || "";

  if (co.file) {
    const duongDanDayDu = path.resolve(process.cwd(), co.file);
    const noiDungFile = fs.readFileSync(duongDanDayDu, "utf8");
    const tach = tachTitleBody(noiDungFile);
    tieuDe = tieuDe || tach.title;
    noiDung = noiDung || tach.body;
  }

  if (!tieuDe && !noiDung) {
    console.error(
      "Thiếu input: truyền --file <path>, hoặc --title/--body. Xem SKILL.md mục Cách dùng.",
    );
    process.exit(1);
  }

  const ketQua = chamMotIssue(tieuDe, noiDung, co);

  console.log(JSON.stringify(ketQua, null, 2));
  console.log("\n--- Lý do (bản đọc được) ---\n" + ketQua.lyDo);

  if (co.outJson) {
    fs.writeFileSync(path.resolve(process.cwd(), co.outJson), JSON.stringify(ketQua, null, 2));
  }
  if (co.outMd) {
    const md =
      `# Kết quả chấm SWP — ${ketQua.tieuDe}\n\n` +
      `| Trục | Mức | Nhãn | Ghi đè thủ công? |\n|---|---|---|---|\n` +
      `| Scope | ${ketQua.scope.ma} | ${ketQua.scope.nhan} | ${ketQua.scope.ghiDe ? "Có" : "Không"} |\n` +
      `| Complexity | ${ketQua.complexity.ma} | ${ketQua.complexity.nhan} | ${ketQua.complexity.ghiDe ? "Có" : "Không"} |\n\n` +
      `**SWP = ${ketQua.swp} · Giờ ước tính = ${ketQua.gio}**\n\n` +
      `## Lý do\n\n\`\`\`\n${ketQua.lyDo}\n\`\`\`\n`;
    fs.writeFileSync(path.resolve(process.cwd(), co.outMd), md);
  }
}

if (require.main === module) {
  main();
}

module.exports = { chamMotIssue, tachTitleBody };
