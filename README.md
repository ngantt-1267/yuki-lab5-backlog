# YUKI SYSTEM — LAB-5 Backlog

**Tên học viên:** nguyen.thi.thuy.nga (cev2)
**Đề:** Product B — Hệ thống quản lý chuỗi kho lạnh thực phẩm (YUKI SYSTEM)

Backlog LAB-5 (GitHub Project, task breakdown, estimate, progress report) phá từ bản thiết kế
LAB-4 của dự án YUKI SYSTEM.

---

## 1 · Tổng quan

- **Phá backlog từ bản LAB-4 nào:** bản thiết kế LAB-4 ở repo `yuki-lab2-prototype`, tính tới
  ngày review nội dung cuối cùng **2026-11-21** (commit `537084c` — sửa ADR-0001 thêm song ngữ
  thuật ngữ và trích dẫn tiếng Nhật, lần sửa nội dung markdown cuối cùng; đối chiếu lại bằng
  `git log --name-only` xác nhận mọi commit **sau** `537084c` tới nay chỉ đồng bộ/định dạng file
  Excel/Word nhị phân — `2b8c116`, `3d54d06`, `ed5ee3d`, `da6e030` — không sửa nội dung markdown
  nào) — **(tạm tính theo ngày review nội dung cuối cùng — PL xác nhận lại ngày nộp chính thức nếu
  khác)**.
- **Phạm vi:** 6 màn cốt lõi LAB-4 (`SCR-D1-02`, `SCR-D1-03`, `SCR-D4-01`, `SCR-D4-03`,
  `SCR-D4-05`, `SCR-D5-01`) + 1 ràng buộc kiến trúc đứng riêng (`FR-SCH-02` — giới hạn giờ lái
  xe) = **7 epic**.
- **`PREMISE.md`:** backlog LAB-5 **có** phát sinh thay đổi/giả định thêm so với bản LAB-4 gốc —
  không phải "giữ nguyên không đổi". Xem `PREMISE.md` (3 phần: spec thêm/bỏ/sửa, giả định bổ
  sung, hướng đã chốt) để biết đúng chỗ nào khác LAB-4 và vì sao.
- **Số epic:** **7** (`#1`–`#7`, label `epic`), cộng **17 issue con/cross-epic** (`#8`–`#24`) —
  tổng **24 issue** thật trên GitHub Project, nằm trong dải mục tiêu 20–35 đã chốt ở `plan.md`.
- **Milestone & Sprint:** **8 Milestone** (khớp 7 Epic `#1`–`#7` + 1 nhóm cross-epic `M8`), mỗi
  Milestone = một cụm chức năng, kéo dài xuyên nhiều **Sprint**. **3 Sprint** (Iteration 1/2/3,
  mỗi sprint 7 ngày: 2026-11-25→12-01 · 12-02→12-08 · 12-09→12-15) dùng chung cho mọi Milestone —
  mỗi sprint chỉ làm một phần của từng cụm chức năng, phần không bị chặn làm trước, phần chờ
  khách/ADR đẩy ra sau. Toàn bộ 24 issue đã gán Milestone (`gh issue edit --milestone`) và Sprint
  (field `Iteration`, `gh project item-edit --iteration-id`) thật trên Project. Xem
  `progress-report.md` để biết chi tiết từng Milestone, trạng thái, burndown Sprint 1 và rủi ro
  trễ (chủ yếu do khối Todo Sprint 3 bị chặn bởi Q&A/ADR chưa trả lời, không phải thiếu năng lực
  đội).

## 2 · Link

| Link | Mô tả | Xác minh ẩn danh |
|---|---|---|
| https://github.com/ngantt-1267/yuki-lab5-backlog | Repo LAB-5 (public) | Đã thử mở bằng request không kèm token xác thực (`curl` không set header `Authorization`) — **HTTP 200**, không cần đăng nhập |
| https://github.com/users/ngantt-1267/projects/1 | GitHub Project #1 (public) — 7 epic, 17 issue con, field Status/Milestone/Iteration (8 Milestone, 3 Sprint) | Đã xác nhận cùng cách — **HTTP 200**, không cần đăng nhập |
| [`bao-cao-cham-swp/index.html`](bao-cao-cham-swp/index.html) | Báo cáo HTML chấm SWP đầy đủ 24 issue (ma trận Scope×Complexity, issue nào PL giữ nguyên/ghi đè) | File tĩnh trong repo này, mở thẳng bằng trình duyệt, không cần server |

Repo LAB-4 nguồn (thiết kế gốc, **PRIVATE**): `https://github.com/ngantt-1267/yuki-lab2-prototype`
— README này **không copy** nội dung spec LAB-4, chỉ trỏ link. Repo đó private, đã chia sẻ quyền
truy cập cho giảng viên chấm bài; người chấm cần quyền riêng nếu muốn xem trực tiếp trên GitHub.

## 3 · Cấu trúc repo

| File/thư mục | Nội dung |
|---|---|
| `README.md` | Trang chủ repo — nội dung bạn đang đọc |
| `PREMISE.md` | Thay đổi/giả định LAB-5 tự thêm so với bản LAB-4 gốc (không lặp giả định đã có sẵn ở LAB-4) |
| `task-breakdown.md` | Nguyên tắc chia task, cách dùng epic→issue→sub-issue trên GitHub Project, bảng Spec→Epic→Issue |
| `estimate.md` | Ước lượng effort (SWP), ma trận Scope×Complexity, bảng tổng theo epic, so sánh với estimate LAB-1 |
| `progress-report.md` | Báo cáo tiến độ giả lập — 8 Milestone × 3 Sprint, trạng thái, burndown Sprint 1, kế hoạch Sprint 2/3, rủi ro trễ |
| `bao-cao-cham-swp/index.html` | Báo cáo HTML sinh bởi `skills/cham-swp/` — chấm điểm chi tiết toàn bộ 24 issue thật |
| `skills/cham-swp/` | Skill chấm SWP tất định (Scope×Complexity→SWP, không gọi LLM) — mã nguồn + ví dụ issue dùng để sinh `estimate.md` và báo cáo HTML |

## 4 · Spec → Epic

| Spec (mã/file LAB-4, hoặc dòng PREMISE) | Epic trên Project | Ghi chú |
|---|---|---|
| `specs/05-screen-spec/scr-d1-02-nhap-kiem-pham.md` (gộp phần tạo mới của `SCR-D1-01`) | `#1` — SCR-D1-02 入荷検品・受入登録 | 3 issue con (`#8`/`#9`/`#10`) vì gộp 3 luồng khác mức sẵn sàng thiết kế |
| `specs/05-screen-spec/scr-d1-03-cach-ly-phan-quyet.md` | `#2` — SCR-D1-03 隔離品一覧・処分判定 | 1 issue con (`#11`) |
| `specs/05-screen-spec/scr-d4-01-dat-hang-va-phan-bo.md` | `#3` — SCR-D4-01 受注登録・引当 | 2 issue con (`#12`/`#13`) |
| `specs/05-screen-spec/scr-d4-03-xep-hang-va-kiem-chung.md` | `#4` — SCR-D4-03 ピッキング・積込検証 | 2 issue con (`#14`/`#15`); `PREMISE.md` §1 ghi nhận một chỗ sửa luồng ghi lịch sử phát hiện khi break `#14` |
| `specs/05-screen-spec/scr-d4-05-xac-nhan-giao-hang.md` | `#5` — SCR-D4-05 配送確認（POD） | 2 issue con (`#16`/`#17`); `PREMISE.md` §1 gắn cờ sai lệch RFP về trường `位置情報` ở `#16`, chưa sửa code |
| `specs/05-screen-spec/scr-d5-01-lap-tuyen-va-cong-bo.md` | `#6` — SCR-D5-01 ルート計画・公開 | 3 issue con (`#18`/`#19`/`#20`); `PREMISE.md` §1 ghi nhận vùng E (`#20`) chưa rõ nguồn dữ liệu, cần thiết kế thêm trước khi code |
| `FR-SCH-02` — Giới hạn giờ lái xe (không gắn vào một màn screen spec cụ thể) | `#7` — FR-SCH-02 Giới hạn giờ lái xe | **Ràng buộc đặc thù của đề bài**: tách Epic riêng thay vì gộp vào `#6` (`/routes`) vì đây là khoảng cách ở tầm kiến trúc (đổi schema `route.rule_version`, ràng buộc pháp lý ngoài hệ thống), effort khác hẳn CRUD thường; bị chặn cứng bởi Q&A No.10 (khách chưa xác nhận lại ngưỡng giờ lái xe) — xem `task-breakdown.md` Phần 3 và `progress-report.md` Phần 4 |
| `PREMISE.md` §1 — `kien-truc-he-thong.md` §6/§7 (giao dịch nguyên tử + chống gửi lại) | Cross-epic `#23` (không gắn epic) | Ảnh hưởng chung 3 màn (`SCR-D1-03`/`SCR-D4-01`/`SCR-D4-03`), không gộp vào một epic để tránh lặp ràng buộc (DRY) |
| `PREMISE.md` §2 — RBAC thật theo ma trận phân quyền, dùng chung 6 màn cốt lõi | Cross-epic `#22` (không gắn epic) | Dùng chung cả 6 màn, không thuộc riêng epic nào; chặn bởi Q&A No.33/No.34 chưa trả lời |
| `PREMISE.md` §2 — `ADR-0001` hướng xử lý số lượng tạm giữ (tách khỏi `#8`) | Cross-epic `#24` (không gắn epic) | Tách riêng khỏi `#8` (đã Done) để chỉ cần mở lại `#24` nếu khách chọn hướng khác A, không phải mở lại `#8` |
