// Phân loại Scope/Complexity từ mô tả issue bằng khớp từ khoá — tất định tuyệt đối:
// cùng một chuỗi input luôn khớp đúng cùng một tập từ khoá, không gọi LLM, không ngẫu nhiên.
// Đây là phần "tự động đọc mô tả issue" — vẫn có thể ghi đè bằng --scope/--complexity thủ công
// ở cham-diem.js khi người chấm không đồng ý với kết quả tự động (ghi rõ lý do ghi đè).

"use strict";

// Thứ tự khai báo là thứ tự ưu tiên khi so khớp: tín hiệu "mạnh" (S3/C3) kiểm trước, vì một mô
// tả dài có thể vô tình chứa cả từ khoá nhỏ lẫn từ khoá lớn — luôn lấy mức CAO NHẤT đã khớp.
const TU_KHOA_SCOPE = {
  S3: [
    "nhiều màn",
    "nhiều trang",
    "tầng kiến trúc",
    "xuyên epic",
    "xuyên suốt hệ thống",
    "toàn hệ thống",
    "cross-cutting",
    "thay đổi schema",
    "thêm bảng",
    "thêm cột",
    "rule_version",
    "ảnh hưởng toàn bộ",
    "nhiều epic",
  ],
  S2: [
    "trọn một màn",
    "toàn bộ màn",
    "cả màn",
    "luồng ghi",
    "trọn luồng",
    "toàn bộ form",
    "một API ghi",
    "trọn trang",
  ],
  S1: [
    "một phần",
    "một trường",
    "một vùng",
    "một ghi chú",
    "một ô",
    "một dòng",
    "hiển thị thêm",
    "chỉnh nhỏ",
    "tinh chỉnh",
  ],
};

const TU_KHOA_COMPLEXITY = {
  C3: [
    "giờ lái xe",
    "pháp lý",
    "bên thứ ba",
    "dịch vụ bản đồ",
    "tích hợp ngoài",
    "ngưỡng pháp luật",
    "external",
    "compliance",
    "fr-sch-02",
    "if-map-01",
    "chưa có thiết kế",
    "ngoại tuyến",
    "mã hoá",
    "chưa tồn tại trong mô hình",
  ],
  C2: [
    "sáu bước",
    "6 bước",
    "thứ tự loại trừ",
    "rule nghiệp vụ",
    "nhiều bước",
    "fefo",
    "fifo",
    "br-date",
    "br-temp",
    "br-delwin",
    "br-exp",
    "điều kiện phức tạp",
  ],
  C1: [
    "crud",
    "thêm/sửa/xoá",
    "thêm sửa xóa",
    "danh sách",
    "form đơn giản",
    "hiển thị dữ liệu",
    "validate cơ bản",
  ],
};

function chuanHoa(text) {
  return (text || "").toLowerCase();
}

// Trả về { level, matchedSignals: string[] } — level mặc định khi không khớp gì được ghi rõ
// trong `macDinh` do caller truyền vào, để mỗi trục (scope/complexity) có một mặc định khác nhau.
function khopTuKhoaTheoMuc(textGoc, bangTuKhoa, thuTuMuc, macDinh) {
  const text = chuanHoa(textGoc);
  for (const muc of thuTuMuc) {
    const dsTuKhoa = bangTuKhoa[muc] || [];
    const khopDuoc = dsTuKhoa.filter((tuKhoa) => text.includes(tuKhoa));
    if (khopDuoc.length > 0) {
      return { level: muc, matchedSignals: khopDuoc, laMacDinh: false };
    }
  }
  return { level: macDinh, matchedSignals: [], laMacDinh: true };
}

function phanLoaiScope(textGoc) {
  // Mặc định S2 "trọn một màn" — khớp quyết định "độ hạt issue = THÔ, 1 issue/khu màn" đã chốt
  // ở plan.md: phần lớn issue trong backlog này nằm ở mức màn, không phải mảnh nhỏ hay kiến trúc.
  return khopTuKhoaTheoMuc(textGoc, TU_KHOA_SCOPE, ["S3", "S2", "S1"], "S2");
}

function phanLoaiComplexity(textGoc) {
  // Mặc định C1 "CRUD thường" — bảo thủ: không thấy tín hiệu đặc biệt thì không tự suy diễn khó.
  return khopTuKhoaTheoMuc(textGoc, TU_KHOA_COMPLEXITY, ["C3", "C2", "C1"], "C1");
}

module.exports = {
  TU_KHOA_SCOPE,
  TU_KHOA_COMPLEXITY,
  phanLoaiScope,
  phanLoaiComplexity,
};
