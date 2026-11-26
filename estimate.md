# Ước lượng effort — LAB-5 backlog YUKI SYSTEM

## 1. Báo cáo HTML

Báo cáo đầy đủ (ma trận chấm điểm + chi tiết toàn bộ 24 issue thật trên Project, có đánh dấu
issue nào PL giữ nguyên / issue nào PL ghi đè): `bao-cao-cham-swp/index.html` (gốc repo này, mở
thẳng bằng trình duyệt, không cần server). Sinh bởi `skills/cham-swp/`, chạy trực tiếp trên 24
issue thật của `github.com/ngantt-1267/yuki-lab5-backlog` (Project #1), không phải issue giả định.

## 2. Issue mẫu — skill chấm vs. PL chốt

Skill chấm SWP tất định (khớp từ khoá + tra bảng ma trận Scope×Complexity, xem
`skills/cham-swp/SKILL.md`), không gọi LLM. Bảng dưới trích vài issue đại diện (đủ epic giờ lái
xe, vài issue "thi công bình thường", và hai issue bị PL ghi đè) — bảng đầy đủ 24 issue nằm trong
báo cáo HTML ở mục 1.

| Issue | Skill chấm (Scope×Complexity→SWP) | PL chốt | Lý do |
|---|---|---|---|
| **#21** — 7.1 Mô hình `rule_version` + kiểm trần giờ lái xe + chèn điểm nghỉ + cấm công bố + hiện khoảng giờ vi phạm (Epic 7 — FR-SCH-02) | S3×C3 → **8 SWP** (32 giờ) — khớp từ khoá `rule_version` (S3) và `giờ lái xe`, `fr-sch-02` (C3) | **Giữ nguyên**, 8 SWP / 32 giờ | Đúng mức trần của thang đo: vừa đổi schema (`route.rule_version`) ảnh hưởng tầng kiến trúc (không gọn trong một màn), vừa có ràng buộc pháp lý ngoài hệ thống (trần giờ lái xe RFP tr.33–34, không hồi tố). Không có lý do để hạ điểm — khớp đúng ví dụ LAB-4 neo trong ma trận |
| **#8** — 1.1 Ghi nhận kiểm hàng nhập — ba loại số lượng, cách ly tự động theo nhiệt độ, ảnh kiểm phẩm thật | S2×C2 → 3 SWP (12 giờ) — khớp từ khoá `br-temp` (`BR-TEMP-02`) | **Giữ nguyên** | Trọn luồng nhập kiểm nằm gọn trong một trang `/inbound`, có chuỗi quyết định nhiều bước (cách ly theo nhiệt độ, 5 trường P0) nhưng toàn bộ dữ liệu đã có sẵn trong hệ thống — đúng C2, không phải C1 (đơn giản hơn thực tế) hay C3 (không có ràng buộc ngoài hệ thống) |
| **#13** — 3.2 Hiển thị đơn gần đây + nhật ký loại trừ gần đây (xem chi tiết `allocation_block.detail`) | S2×C1 → 2 SWP (8 giờ) — không khớp từ khoá đặc biệt nào, dùng mức mặc định | **Giữ nguyên** | Thuần đọc dữ liệu, không chặn luồng ghi của issue 3.1, không có rule loại trừ nào ở chính issue này — đúng CRUD thường |
| **#22** — X.1 Áp RBAC thật theo ma trận phân quyền + phân tách dữ liệu theo kho/khu vực (dùng chung 6 màn cốt lõi) | S2×C1 → 2 SWP (8 giờ) tự động | **Sửa → S3×C3 → 8 SWP** (32 giờ) | Từ khoá tự động không bắt được cụm "dùng chung cả 6 màn" (thực tế ảnh hưởng tầng kiến trúc, không phải một màn — nâng Scope S2→S3) và không hiểu "phân tách dữ liệu theo kho/khu vực" đòi một mô hình dữ liệu **mới chưa tồn tại** (hiện chỉ có RBAC theo vai trò) — đúng định nghĩa C3, nâng Complexity C1→C3. Bị chặn bởi Q&A No.33/34 (RFP) chưa trả lời |
| **#23** — X.2 Gộp giao dịch nguyên tử cho ba luồng ghi hai bước + chống gửi lại cho SCR-D4-01 | S2×C1 → 2 SWP (8 giờ) tự động, khớp "luồng ghi" | **Sửa → S3×C2 → 5 SWP** (20 giờ) | Ảnh hưởng BA màn (`SCR-D1-03`/`SCR-D4-01`/`SCR-D4-03`) dùng chung một loại rủi ro giao dịch — từ khoá tự động chỉ đếm được "luồng ghi" (S2), không đếm được số màn liên quan, nâng Scope S2→S3. Complexity giữ C2 (không phải C1 CRUD): đây là một quy trình kỹ thuật nhiều bước (bọc transaction + idempotency key), nhưng cũng không phải C3 vì dữ liệu/hạ tầng đều nằm trong hệ thống hiện có, không phải ràng buộc ngoài hệ thống |
| **Cả 7 issue Epic** (ví dụ #1, #7 — `[Epic] ...`) | Tự động ra điểm khác nhau tuỳ mô tả ngắn của epic (ví dụ epic 7 ra S2×C3 → 5 SWP) | **Sửa → Point = 0, Giờ = 0 cho tất cả 7 epic** | Epic là issue cha gom nhóm issue con qua quan hệ sub-issue thật (`gh issue create --parent`), không phải một đơn vị thi công độc lập. Công sức thật nằm trong 17 issue con; giữ điểm skill chấm trên chính epic (ra từ mô tả ngắn, không đại diện khối lượng code) sẽ **cộng trùng** công việc đã tính ở issue con khi gộp bảng tổng (Phần 4). Áp dụng đồng nhất cho cả 7 epic, không ngoại lệ |

## 3. Cách quy SWP ra giờ

Hệ số cố định: **1 SWP = 4 giờ**, áp dụng như nhau cho **mọi** issue/epic, không có bảng quy đổi
riêng theo từng epic.

Lý do chọn 4: mức thấp nhất của thang đo (S1×C1 = 1 SWP, "một phần một màn" + "CRUD thường" — ví
dụ: thêm một trường/ghi chú vào form đã có) phải vừa trong **nửa ngày làm việc** của một dev quen
stack Next.js/Supabase của dự án này — khớp quan sát thật từ LAB-4 (một ghi chú/một trường thêm
vào form có sẵn thực tế là việc dưới nửa ngày). Độ phức tạp cao hơn đã được phản ánh qua **số SWP
cao hơn** (ma trận Scope×Complexity), không phải qua một hệ số giờ/SWP khác nhau giữa các epic —
đúng yêu cầu "quy tắc cụ thể áp dụng nhất quán, không ngoại lệ" (kể cả epic giờ lái xe FR-SCH-02,
tuy phức tạp hơn nhưng vẫn dùng chung hệ số 4, chỉ khác ở số SWP được chấm).

## 4. Tổng theo epic

Tính thật từ 24 issue đã chấm trên Project (issue con mang điểm thật; 7 issue Epic mang
Point=0/Giờ=0 theo lý do ở Phần 2, nên không cộng vào tổng dưới đây để tránh đếm trùng).

| Epic | Số issue (con) | Tổng SWP | Tổng giờ | Ghi chú |
|---|---|---|---|---|
| 1 — SCR-D1-02 入荷検品・受入登録 | 3 | 7 | 28 | — |
| 2 — SCR-D1-03 隔離品一覧・処分判定 | 1 | 3 | 12 | — |
| 3 — SCR-D4-01 受注登録・引当 | 2 | 5 | 20 | — |
| 4 — SCR-D4-03 ピッキング・積込検証 | 2 | 5 | 20 | — |
| 5 — SCR-D4-05 配送確認（POD） | 2 | 8 | 32 | — |
| 6 — SCR-D5-01 ルート計画・公開 | 3 | 10 | 40 | — |
| 7 — FR-SCH-02 Giới hạn giờ lái xe | 1 | 8 | 32 | Epic riêng theo quyết định #3 (`plan.md`) vì đây là khoảng cách tầm kiến trúc, không chỉ một màn. Chỉ 1 issue nhưng điểm đã ở mức trần (S3×C3=8) — effort/issue cao hơn hẳn Scope tương đương vì vừa đổi schema (`rule_version`) vừa có ràng buộc pháp lý ngoài hệ thống |
| Cross-epic (X.1/X.2/X.3) | 3 | 14 | 56 | X.1 (RBAC xuyên 6 màn, 8 SWP) bị PL nâng điểm — xem Phần 2; X.2 (giao dịch nguyên tử, ảnh hưởng 3 màn, 5 SWP) cũng bị PL nâng; X.3 (sinh hai `inventory_unit`, 1 SWP) giữ nguyên, phạm vi hẹp vì cố ý tách khỏi issue 1.1 để chờ `ADR-0001` được khách duyệt |
| **TỔNG** | **17** | **60** | **240** | 7 issue Epic không cộng điểm (Point=0/Giờ=0) — xem Phần 2 và Phần 1 (báo cáo HTML) |

## 5. So với estimate LAB-1

**Đã tìm thấy** file ước lượng LAB-1 thật: `[###(ProjectID)] YUKI SYSTEM - Effort Estimation.xlsx`
(mẫu `BM-2-901-22`, version 1.5, tại
`...\Hệ thống quản lý chuỗi kho lạnh thực phẩm\deliverables\`, đọc-only, không sửa). Đây là ước
lượng **presales rough cho TOÀN BỘ hệ thống** (31 màn D1–D8 + migrate dữ liệu + hạ tầng + SSO +
báo cáo + đào tạo + hypercare): Baseline **823.53 người-ngày / 47.35 người-tháng** (1 MD = 7 giờ),
không phải file ước lượng riêng cho 6 màn cốt lõi của LAB-5 — nên **không so tổng-tổng được**, chỉ
so theo từng tính năng khớp tên trong sheet `01_Server` (cột "Screen・Feature", có mã `No.X/US-YY`
tham chiếu `User Story List` gốc).

**Quy ước đọc bảng:** cột LAB-1 cộng `Backend(Implement+FixBug+UnitTest) + Frontend(Implement+
FixBug+UnitTest) + Design UI/UX` của đúng dòng khớp tên tính năng trong `01_Server`, quy đổi
người-ngày → giờ theo đúng ghi chú của chính file LAB-1 ("1 MD = 7 giờ"). Cột LAB-5 lấy từ Phần 4.

| Epic (LAB-5) | LAB-1 (giờ, quy đổi 1 MD=7h) | LAB-5 (giờ) | Chênh | Vì sao |
|---|---|---|---|---|
| 1 — SCR-D1-02 | 161.5 (US-01 入荷予約管理 + US-02 入荷検品・受入登録 + US-03 ロット・在庫単位の自動生成, `01_Server` dòng 13–15) | 28 | −133.5 | LAB-1 cộng cả Implement+FixBug(hệ số 0.3)+UnitTest(hệ số 0.7)+Design UI/UX cho 3 tính năng gộp (đặt lịch hẹn, kiểm hàng, sinh lô/tồn kho tự động); LAB-5 SWP→giờ là ước **thô một cục** cho cả issue, không tách hệ số test/fixbug/design riêng như LAB-1 — hai cột không cùng "đơn vị việc" |
| 2 — SCR-D1-03 | 79.5 (US-04 不合格品の自動隔離 + US-05 隔離品一覧・disposition確定, dòng 16–17; **chưa gồm** 60h máy trạng thái tồn kho dùng chung US-06, vì thuộc 4 tính năng khác nhau) | 12 | −67.5 | Cùng lý do Phần 1; thêm: LAB-1 tách riêng một "máy trạng thái tồn kho" (cách ly→tạm giữ→giải phóng/huỷ) tái dùng bởi 4 user story, LAB-5 gộp thẳng logic này vào issue 2.1, không tách dòng riêng |
| 3 — SCR-D4-01 | 127.5 (US-13 受注登録・一覧 + US-14 在庫引当 NC-D3-01 6段階除外, dòng 25–26) | 20 | −107.5 | Cùng lý do Phần 1 |
| 4 — SCR-D4-03 | 147.5 (US-15 ピッキングタスク編成 + US-16 ピッキング・積込検証 + US-17 出荷前チェック記録, dòng 27–29) | 20 | −127.5 | Cùng lý do Phần 1 |
| 5 — SCR-D4-05 | 62 (chỉ US-18 POD取得, dòng 30; LAB-1 **không có dòng** cho hàng đợi bằng chứng ngoại tuyến) | 32 | −30 (so được) + phần 5.2 không so được | LAB-1 chỉ ước phần POD cơ bản ngay lúc giao hàng; "hàng đợi bằng chứng ngoại tuyến tối đa 8 giờ, mã hoá" (issue 5.2, `NFR-AVL-02`) là yêu cầu được làm rõ muộn hơn ở kiến trúc LAB-4, không tồn tại trong scope LAB-1 — không có số LAB-1 cho riêng phần này |
| 6 — SCR-D5-01 | 122 (US-20 ルート作成・休息ポイント挿入 IF-MAP-01 + US-22 ルート公開・版管理, dòng 32–33; **chưa gồm** US-21 vì dòng đó khớp Epic 7) | 40 | −82 | Cùng lý do Phần 1; LAB-1 gộp "tạo tuyến" và "tích hợp bản đồ IF-MAP-01" làm một dòng, LAB-5 tách issue 6.2 riêng vì còn chờ chọn nhà cung cấp bản đồ (Q&A No.7); issue 6.3 (hiện lý do chưa gán tuyến) không có dòng LAB-1 tương ứng |
| 7 — FR-SCH-02 | 28 (US-21 拘束時間遵守チェック・ハードストップ, dòng 34) | 32 | **+4** | **Trường hợp duy nhất LAB-5 ước CAO HƠN LAB-1.** LAB-1 chỉ tính phần "kiểm tuân thủ, chặn cứng" (hard-stop); LAB-5 issue 7.1 gộp thêm mô hình `rule_version` (đổi schema), chèn điểm nghỉ khi lái liên tục >4 giờ, và hiển thị đúng khoảng giờ vi phạm — phạm vi rộng hơn rõ rệt. Đúng như lo ngại nêu ở quyết định #3 (`plan.md`): tách epic riêng cho ràng buộc này làm **lộ ra effort bị ẩn** trong ước lượng rough ban đầu của LAB-1 |
| X.1 — RBAC xuyên 6 màn | 63.5 (US-42 ロール・権限管理 8 vai trò, dòng 53) — **nhưng LAB-1 minh thị loại trừ** phần "phân tách theo kho/khu vực" (`00_Summary` mục 2 "Out of Scope" dòng 49: "拠点・地域単位の行レベルアクセス制御") | 32 | Không so trực tiếp được | LAB-1 chỉ ước RBAC theo **vai trò** (role-based); LAB-5 X.1 đòi CẢ vai trò lẫn phân tách dữ liệu theo kho/khu vực (row-level) — phần khó nhất của X.1 không nằm trong 63.5 giờ của LAB-1. Hai số không cùng phạm vi, chỉ nêu để tham khảo |
| X.2 — giao dịch nguyên tử xuyên 3 màn | Không tìm thấy hạng mục LAB-1 tương ứng | 20 | — | Hạng mục kỹ thuật phát sinh từ review kiến trúc LAB-4 (`kien-truc-he-thong.md` §6/§7: cột "Một giao dịch?"/"Chống gửi lại"), chưa tồn tại ở giai đoạn presales LAB-1 — xem `PREMISE.md` |
| X.3 — double `inventory_unit` | Không tìm thấy hạng mục LAB-1 tương ứng | 4 | — | Phát sinh từ `ADR-0001` (hướng A, PL tạm chốt 2026-11-07), là quyết định **sau** LAB-1 và **chưa được khách duyệt** — xem `PREMISE.md` |

**Đọc tổng thể:** trừ Epic 7, LAB-5 luôn ước **thấp hơn** LAB-1 cho cùng tính năng — không phải vì
LAB-5 lạc quan hơn, mà vì hai file đo hai thứ khác nhau: LAB-1 là ước lượng rough đầy đủ vòng đời
(implement + fix bug + unit test + thiết kế UI/UX) cho toàn hệ thống 31 màn ở giai đoạn presales
(trước khi có 34 Q&A trả lời), còn LAB-5 là ước thô (1 issue/khu màn, không tách hệ số test/fixbug/
design) chỉ cho 6 màn cốt lõi đã có thiết kế chi tiết LAB-4. Trường hợp Epic 7 đảo ngược xu hướng
này là tín hiệu đáng tin cậy nhất trong bảng: nó cho thấy giá trị thật của việc tách `FR-SCH-02`
thành epic riêng (quyết định #3) — một ràng buộc kiến trúc từng bị ẩn trong một dòng ước lượng
rough giờ đã lộ rõ effort thật.
