#!/usr/bin/env node
// Sinh báo cáo HTML tĩnh gộp kết quả chấm SWP — mở thẳng bằng trình duyệt, không cần server,
// không cần cài thêm gì (CSS/nội dung inline trong một file .html).

"use strict";

const fs = require("fs");
const path = require("path");
const {
  SCOPE_LEVELS,
  COMPLEXITY_LEVELS,
  MA_TRAN_SWP,
  HE_SO_GIO_MOI_SWP,
  tinhGio,
} = require("./ma-tran-diem");
const { chamMotIssue, tachTitleBody } = require("./cham-diem");

function thoatHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function dongBangMaTran() {
  const hang = ["S1", "S2", "S3"];
  const cot = ["C1", "C2", "C3"];
  let html = "<table><thead><tr><th>Scope \\ Complexity</th>";
  for (const c of cot) html += `<th>${c} — ${COMPLEXITY_LEVELS[c].nhan}</th>`;
  html += "</tr></thead><tbody>";
  for (const s of hang) {
    html += `<tr><th>${s} — ${SCOPE_LEVELS[s].nhan}</th>`;
    for (const c of cot) {
      const swp = MA_TRAN_SWP[s][c];
      html += `<td>${swp} SWP<br><small>${tinhGio(swp)} giờ</small></td>`;
    }
    html += "</tr>";
  }
  return html + "</tbody></table>";
}

function khoiKetQuaMotIssue(ketQua) {
  return `
  <section class="issue">
    <h3>${thoatHtml(ketQua.tieuDe)}</h3>
    <div class="diem">
      <span class="badge scope">${ketQua.scope.ma} · ${thoatHtml(ketQua.scope.nhan)}</span>
      <span class="badge complexity">${ketQua.complexity.ma} · ${thoatHtml(ketQua.complexity.nhan)}</span>
      <span class="badge swp">SWP = ${ketQua.swp}</span>
      <span class="badge gio">${ketQua.gio} giờ</span>
    </div>
    <pre class="ly-do">${thoatHtml(ketQua.lyDo)}</pre>
  </section>`;
}

function docIssueMau(tenFile) {
  const duongDan = path.join(__dirname, "vi-du-issue", tenFile);
  const noiDung = fs.readFileSync(duongDan, "utf8");
  const { title, body } = tachTitleBody(noiDung);
  return chamMotIssue(title, body, {});
}

function main() {
  const ketQua01 = docIssueMau("vi-du-01-scr-d4-01-them-truong-ghi-chu.md");
  const ketQua02 = docIssueMau("vi-du-02-fr-sch-02-gio-lai-xe.md");

  const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<title>Báo cáo chấm SWP — LAB-5 backlog YUKI SYSTEM</title>
<style>
  body { font-family: "Segoe UI", system-ui, sans-serif; max-width: 920px; margin: 32px auto;
         padding: 0 16px; color: #1a1a1a; background: #fafafa; }
  h1 { font-size: 1.5rem; } h2 { margin-top: 2.5rem; border-bottom: 2px solid #ddd; padding-bottom: .3rem; }
  table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
  th, td { border: 1px solid #ccc; padding: 8px 10px; text-align: center; font-size: .92rem; }
  th { background: #eef2f7; }
  .issue { background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 16px 20px; margin: 1rem 0; }
  .diem { margin: .5rem 0 1rem; }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: .85rem;
           margin-right: 6px; color: #fff; }
  .badge.scope { background: #2563eb; } .badge.complexity { background: #7c3aed; }
  .badge.swp { background: #059669; font-weight: 600; } .badge.gio { background: #475569; }
  pre.ly-do { white-space: pre-wrap; background: #f6f6f6; border: 1px solid #e5e5e5; border-radius: 6px;
              padding: 12px 14px; font-size: .88rem; line-height: 1.5; }
  code { background: #eee; padding: 1px 5px; border-radius: 4px; }
  footer { margin-top: 3rem; font-size: .8rem; color: #777; }
</style>
</head>
<body>
  <h1>Báo cáo chấm SWP — LAB-5 backlog YUKI SYSTEM</h1>
  <p>Sinh bởi skill <code>skills/cham-swp</code>. Quy tắc tất định: cùng một issue chấm lại
     nhiều lần vẫn ra đúng cùng một kết quả — không có bước ngẫu nhiên hay gọi LLM trong vòng
     chấm điểm, chỉ khớp từ khoá và tra bảng cố định.</p>

  <h2>Ma trận Scope × Complexity → SWP</h2>
  <p>Dãy Fibonacci Agile (1-2-3-5-8), xếp theo đường chéo tăng dần cả hai trục. Trần 8 — không
     dùng 13 — vì độ hạt issue của backlog này đã chốt là <b>thô</b> (1 issue/khu màn); một issue
     ước ra 13+ là dấu hiệu phải tách nhỏ, không phải chấm 13.</p>
  ${dongBangMaTran()}
  <p>Quy đổi giờ: <b>1 SWP = ${HE_SO_GIO_MOI_SWP} giờ</b> (hệ số cố định, áp dụng như nhau cho
     mọi epic — xem lý do đầy đủ trong <code>ma-tran-diem.js</code>).</p>

  <h2>Kết quả chấm 2 issue mẫu (hai đầu thang điểm)</h2>
  ${khoiKetQuaMotIssue(ketQua01)}
  ${khoiKetQuaMotIssue(ketQua02)}

  <h2>Ghi lên GitHub Project</h2>
  <p>Script <code>ghi-len-github-project.js</code> ghi SWP/giờ lên field kiểu <b>NUMBER</b> của
     GitHub Project qua <code>gh project item-edit --field "&lt;tên field&gt;" --number &lt;giá trị&gt;</code>
     (đã xác minh thật bằng <code>gh project item-edit --help</code>, gh v2.101.0). Field
     <b>Iteration</b> không tạo được qua CLI/GraphQL — PL tạo tay một lần qua giao diện web, script
     này không đụng tới field đó.</p>

  <footer>Sinh tự động — xem mã nguồn trong <code>skills/cham-swp/</code>.</footer>
</body>
</html>
`;

  const duongDanRa = path.join(__dirname, "..", "..", "bao-cao-cham-swp", "index.html");
  fs.writeFileSync(duongDanRa, html, "utf8");
  console.log(`Đã ghi báo cáo: ${duongDanRa}`);
}

if (require.main === module) {
  main();
}
