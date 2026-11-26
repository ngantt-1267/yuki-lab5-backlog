// Ma trận chấm điểm SWP (Scope x Complexity) — nguồn sự thật duy nhất cho mọi quy tắc tính điểm.
// Không để script khác tự suy ra con số SWP bằng cách khác — mọi nơi phải require file này.

"use strict";

// --- Bảng mức Scope (phạm vi tác động) ----------------------------------
// Neo vào cách chia màn thật của LAB-4 (xem specs/05-screen-spec/*.md):
// một "khu màn" trong LAB-4 là đơn vị issue thô đã chốt ở plan.md mục #1.
const SCOPE_LEVELS = {
  S1: {
    ma: "S1",
    nhan: "Một phần một màn",
    moTa:
      "Chỉnh một vùng, một trường, hoặc một ghi chú trong MỘT màn đã có — không đụng luồng ghi " +
      "(API) và không đụng màn khác.",
    viDuThat:
      "SCR-D4-01 vùng B-5 'Ghi chú phạm vi vai' — thêm một dòng ghi chú tĩnh trên form đã có, " +
      "không đổi API-ORD-01/API-ALC-01.",
  },
  S2: {
    ma: "S2",
    nhan: "Trọn một màn hoặc một luồng ghi",
    moTa:
      "Dựng/sửa trọn một màn (mọi vùng A-F), hoặc trọn một luồng ghi xuyên suốt (form → API → " +
      "phản hồi) — nhưng không lan sang màn khác hay tầng kiến trúc chung.",
    viDuThat:
      "SCR-D1-02 入荷検品・受入登録 — trọn luồng B-8/overlay H đăng ký lịch hẹn mới + kiểm từng " +
      "dòng hàng + ghi 3 loại số lượng, nằm gọn trong một trang /inbound.",
  },
  S3: {
    ma: "S3",
    nhan: "Nhiều màn hoặc tầng kiến trúc",
    moTa:
      "Đổi một quy tắc/khái niệm được NHIỀU màn dùng chung, hoặc đụng tới mô hình dữ liệu nền " +
      "(schema, cột mới, bảng mới) mà nhiều nơi phụ thuộc vào.",
    viDuThat:
      "FR-SCH-02 giới hạn giờ lái xe — RFP tr.34 ghi rõ route cần cột rule_version mới, luật " +
      "này ràng buộc cả /routes lẫn cách khoá phiên bản tuyến, không nằm gọn trong một màn.",
  },
};

// --- Bảng mức Complexity (độ khó nghiệp vụ) ------------------------------
const COMPLEXITY_LEVELS = {
  C1: {
    ma: "C1",
    nhan: "CRUD thường",
    moTa:
      "Tạo/sửa/xoá/hiển thị dữ liệu với validate cơ bản (bắt buộc, kiểu dữ liệu, khoảng giá trị) " +
      "— không có chuỗi quyết định nhiều bước, không có nguồn ngoài hệ thống.",
    viDuThat:
      "SCR-D4-01 B-0..B-3 — chọn khách hàng, chọn SKU, nhập số lượng, nhập ngày giao mong muốn: " +
      "bốn trường input + validate required/min, không có rule loại trừ nào ở bước nhập.",
  },
  C2: {
    ma: "C2",
    nhan: "Có rule nghiệp vụ nhiều bước",
    moTa:
      "Một chuỗi điều kiện/quyết định nhiều bước, thứ tự áp dụng CỐ ĐỊNH và không được đảo " +
      "(đổi thứ tự là sai luật), nhưng toàn bộ dữ liệu cần đều có sẵn trong hệ thống.",
    viDuThat:
      "SCR-D4-01 — thứ tự 6 bước loại trừ phân bổ (RFP tr.26): quá hạn use-by → lệch dải nhiệt " +
      "→ đang cách ly → vi phạm delivery window → vi phạm cấm đảo ngược ngày → FEFO/FIFO.",
  },
  C3: {
    ma: "C3",
    nhan: "Có ràng buộc ngoài hệ thống",
    moTa:
      "Phụ thuộc một nguồn/luật NẰM NGOÀI phạm vi hệ thống tự quyết được — ràng buộc pháp lý, " +
      "dịch vụ bên thứ ba, hoặc dữ liệu chưa tồn tại trong mô hình hiện tại và phải thiết kế mới.",
    viDuThat:
      "FR-SCH-02 kiểm giới hạn giờ lái xe (trần pháp lý năm/tháng/ngày/tuần, RFP tr.34) và " +
      "IF-MAP-01 nối dịch vụ bản đồ ngoài (ước lượng quá 24 giờ thì cấm công bố, RFP tr.56).",
  },
};

// --- Ma trận Scope x Complexity → SWP ------------------------------------
// Dãy Fibonacci Agile quen thuộc (1-2-3-5-8-13), xếp theo đường chéo tăng dần cả hai trục —
// một issue phạm vi nhỏ nhưng ràng buộc ngoài phức tạp (S1xC3=3) được coi ngang một issue phạm
// vi rộng nhưng nghiệp vụ CRUD (S3xC1=3): cùng tốn công ngang nhau theo kinh nghiệm planning
// poker thông thường. Trần 8 (không dùng 13) vì độ hạt issue đã chốt là THÔ (1 issue/khu màn,
// xem plan.md mục "cần chốt" #1) — một issue không nên phình tới mức cần 13 SWP; nếu ước ra 13+
// thì đó là dấu hiệu phải TÁCH issue, không phải chấm 13.
const MA_TRAN_SWP = {
  S1: { C1: 1, C2: 2, C3: 3 },
  S2: { C1: 2, C2: 3, C3: 5 },
  S3: { C1: 3, C2: 5, C3: 8 },
};

// --- Hệ số quy đổi SWP → giờ (quyết định "cần chốt" #9, agent tự quyết) --
// 1 SWP = 4 giờ làm việc thật.
// Lý do chọn 4: mức CRUD thường + phạm vi nhỏ nhất (S1xC1=1 SWP) phải vừa trong NỬA NGÀY làm
// việc của một dev quen stack Next.js/Supabase — khớp quan sát thật từ LAB-4 (một ghi chú/một
// trường thêm vào form có sẵn là việc dưới nửa ngày). Hệ số áp DUY NHẤT một con số cho mọi epic,
// không có bảng quy đổi riêng theo epic — đúng yêu cầu "quy tắc cụ thể áp dụng nhất quán" của
// đề bài §estimate.md mục 3. Đổi hệ số này ở một chỗ duy nhất, không rải rác trong code khác.
const HE_SO_GIO_MOI_SWP = 4;

function tinhSWP(maScope, maComplexity) {
  const hangScope = MA_TRAN_SWP[maScope];
  if (!hangScope) {
    throw new Error(`Mức Scope không hợp lệ: "${maScope}" — chỉ nhận S1, S2, S3.`);
  }
  const swp = hangScope[maComplexity];
  if (swp === undefined) {
    throw new Error(`Mức Complexity không hợp lệ: "${maComplexity}" — chỉ nhận C1, C2, C3.`);
  }
  return swp;
}

function tinhGio(swp) {
  return swp * HE_SO_GIO_MOI_SWP;
}

module.exports = {
  SCOPE_LEVELS,
  COMPLEXITY_LEVELS,
  MA_TRAN_SWP,
  HE_SO_GIO_MOI_SWP,
  tinhSWP,
  tinhGio,
};
