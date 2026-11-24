#!/usr/bin/env node
// Ghi điểm SWP/giờ đã chấm lên một field kiểu NUMBER của GitHub Project (v2), qua `gh` CLI.
//
// ĐÃ XÁC MINH THẬT trên máy (gh version 2.101.0, không suy đoán — xem lệnh --help thật):
//   gh project field-create <number> --owner <login> --name "<tên field>" --data-type NUMBER
//   gh project item-edit <number> --owner <login> --url <issue-url> --field "<tên field>" --number <giá trị>
// `--number` là cờ RIÊNG cho field kiểu NUMBER (khác --text/--date/--single-select-option-id) —
// đây là tên cờ chính xác, không phải suy đoán từ `--value`.
//
// GIỚI HẠN ĐÃ BIẾT: `field-create` KHÔNG nhận --data-type ITERATION, và GraphQL cũng không có
// mutation tạo/cấu hình iteration field. Field Iteration phải được PL tạo TAY một lần qua giao
// diện web Project — script này KHÔNG được giả định field Iteration tồn tại, và không đụng tới
// nó. Script chỉ thao tác trên field Point/Giờ (NUMBER) mà CLI tạo và ghi được.
//
// Script này KHÔNG tự chạy khi `cham-diem.js` chạy — phải gọi riêng, có chủ đích, sau khi Phase 3
// đã dựng Project thật và có field NUMBER tên cố định. Không hard-code token: dùng `gh auth`
// đã đăng nhập sẵn trên máy (theo luật "không commit secret").

"use strict";

const { spawnSync } = require("child_process");

function chayGh(args) {
  const ketQua = spawnSync("gh", args, { encoding: "utf8" });
  if (ketQua.error) {
    throw new Error(`Không gọi được 'gh': ${ketQua.error.message}`);
  }
  if (ketQua.status !== 0) {
    throw new Error(`'gh ${args.join(" ")}' thất bại (exit ${ketQua.status}):\n${ketQua.stderr}`);
  }
  return ketQua.stdout.trim();
}

// Tạo field NUMBER (ví dụ "SWP" hoặc "Giờ ước tính") nếu chưa có. Idempotent ở mức best-effort:
// gọi lại khi field đã tồn tại sẽ báo lỗi từ phía GitHub — bắt lỗi đó và coi là đã sẵn sàng.
function daoBaoFieldNumber({ ownerLogin, projectNumber, tenField }) {
  try {
    chayGh([
      "project", "field-create", String(projectNumber),
      "--owner", ownerLogin,
      "--name", tenField,
      "--data-type", "NUMBER",
      "--format", "json",
    ]);
    return { daTao: true };
  } catch (loi) {
    // GitHub báo lỗi "already exists" bằng thông điệp tiếng Anh khác nhau tuỳ phiên bản API —
    // không chắc khớp chuỗi, nên chỉ ghi nhận cảnh báo, không chặn luồng ghi giá trị.
    return { daTao: false, canhBao: loi.message };
  }
}

// Ghi một giá trị số lên field của đúng issue (theo URL issue thật, không phải URL Project).
function ghiGiaTriLenItem({ ownerLogin, projectNumber, issueUrl, tenField, giaTri }) {
  chayGh([
    "project", "item-edit", String(projectNumber),
    "--owner", ownerLogin,
    "--url", issueUrl,
    "--field", tenField,
    "--number", String(giaTri),
  ]);
  return { daGhi: true, issueUrl, tenField, giaTri };
}

function main() {
  const argv = process.argv.slice(2);
  const layCo = (ten) => {
    const vt = argv.indexOf(ten);
    return vt >= 0 ? argv[vt + 1] : null;
  };

  const ownerLogin = layCo("--owner");
  const projectNumber = layCo("--project");
  const issueUrl = layCo("--issue-url");
  const tenField = layCo("--field") || "SWP";
  const giaTri = layCo("--value");

  if (!ownerLogin || !projectNumber || !issueUrl || giaTri === null) {
    console.error(
      "Thiếu tham số. Dùng: node ghi-len-github-project.js --owner <login> --project <số> " +
        "--issue-url <url issue> --field <tên field NUMBER> --value <số>",
    );
    process.exit(1);
  }

  const ketQuaGhi = ghiGiaTriLenItem({
    ownerLogin,
    projectNumber: Number(projectNumber),
    issueUrl,
    tenField,
    giaTri: Number(giaTri),
  });
  console.log(JSON.stringify(ketQuaGhi, null, 2));
}

if (require.main === module) {
  main();
}

module.exports = { daoBaoFieldNumber, ghiGiaTriLenItem };
