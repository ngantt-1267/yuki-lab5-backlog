# Progress Report — Iteration 1 (giả lập)

**Iteration:** Iteration 1
**Khoảng thời gian giả lập:** 2026-11-25 → 2026-12-01 (7 ngày)
**Ngày "hôm nay" trong kịch bản:** 2026-11-28 (ngày thứ 4/7, giữa sprint)
**Nguồn dữ liệu:** `gh project item-list 1 --owner "@me" --format json --limit 50` (Project v2 #1,
repo `ngantt-1267/yuki-lab5-backlog`), đọc ngày 2026-11-25. Toàn bộ 24 issue (7 epic + 17 issue
con/cross-epic) đã được gán vào Iteration 1 — đây là sprint giả lập duy nhất đang chạy.

---

## 1. Tổng quan Iteration

| Mục | Giá trị |
|---|---|
| Tên Iteration | Iteration 1 |
| Bắt đầu | 2026-11-25 |
| Kết thúc | 2026-12-01 (7 ngày) |
| Tổng số issue trong Iteration | 24 (7 epic + 17 issue con/cross-epic) |
| Tổng SWP có hiệu lực (loại trừ 7 epic, xem ghi chú) | 60 SWP / 240 giờ |

---

## 2. Trạng thái

> **Ghi chú quan trọng:** 7 issue Epic (`#1`–`#7`) mang **Point (SWP) = 0 / Giờ ước lượng = 0**
> theo quyết định đã chốt ở Phase 5 (`estimate.md` Phần 2) — Epic là issue cha gom nhóm qua quan hệ
> sub-issue thật của GitHub, không phải đơn vị thi công độc lập; cộng điểm trên cả Epic lẫn issue
> con sẽ **đếm trùng** công việc. Bảng dưới tách riêng cột Epic để không gây hiểu lầm rằng Epic
> "không có việc gì" — công sức thật của Epic nằm trọn trong các issue con cùng tên đã liệt ở cột
> bên.

| Trạng thái | Số issue (tổng) | — trong đó Epic (SWP=0) | — trong đó issue con/cross-epic | Tổng SWP (chỉ tính issue con/cross-epic) | Ghi chú |
|---|---|---|---|---|---|
| Done | 6 | 1 (`#2`) | 5 (`#8,#9,#11,#14,#18`) | 14 | Done gồm cả màn Cách ly (`#2`→`#11`), 2 issue của màn Nhập kiểm phẩm, 1 issue Kiểm xếp hàng, 1 issue Form công bố tuyến |
| In Progress | 8 | 5 (`#1,#3,#4,#5,#6`) | 3 (`#12,#16,#23`) | 11 | 5/6 Epic màn đang "In Progress" vì ít nhất 1 issue con của chúng đang chạy hoặc đã Done một phần; issue con thật đang chạy: 3.1 phân bổ đơn hàng, 5.1 ghi nhận giao hàng, X.2 giao dịch nguyên tử |
| Todo | 10 | 1 (`#7`) | 9 (`#10,#13,#15,#17,#19,#20,#21,#22,#24`) | 35 | Xem Phần 3 — 8/9 issue con ở Todo bị chặn bởi Q&A/ADR chưa trả lời, không phải do thiếu năng lực đội |
| **Tổng** | **24** | **7 (0 SWP)** | **17** | **60** | Khớp tổng SWP/giờ đã tính ở `estimate.md` Phần 4 (60 SWP / 240 giờ) |

---

## 3. Burndown (bảng ngày × SWP còn lại)

Project không có sẵn view Insights/burndown cho repo này (plan tự do, không phải tổ chức trả phí) —
dùng bảng thay thế theo đúng cho phép của đề bài. Đơn vị: SWP còn lại trong 60 SWP có hiệu lực
(17 issue con/cross-epic; 7 Epic không tính vì SWP=0, xem Phần 2).

| Ngày | Lý tưởng (SWP còn lại) | Thực tế/dự kiến (SWP còn lại) | Issue hoàn thành trong ngày | Trạng thái |
|---|---|---|---|---|
| 2026-11-25 (Ngày 1 — bắt đầu) | 60.0 | 60 | — | Thực tế |
| 2026-11-26 (Ngày 2) | 50.0 | 58 | `#9` (2 SWP — 1.2 đăng ký lịch hẹn) | Thực tế |
| 2026-11-27 (Ngày 3) | 40.0 | 52 | `#8` (3 SWP), `#11` (3 SWP) | Thực tế |
| 2026-11-28 (Ngày 4 — **hôm nay**) | 30.0 | 46 | `#14` (3 SWP), `#18` (3 SWP) | Thực tế |
| 2026-11-29 (Ngày 5) | 20.0 | 46 | — (không issue nào về Done) | Dự kiến |
| 2026-11-30 (Ngày 6) | 10.0 | 41 | `#23` (5 SWP — X.2 giao dịch nguyên tử, đang In Progress, dự kiến xong) | Dự kiến |
| 2026-12-01 (Ngày 7 — kết thúc) | 0.0 | 35 | `#12` (3 SWP), `#16` (3 SWP) (2 issue In Progress còn lại, dự kiến xong) | Dự kiến |

**Cách tính cột Lý tưởng:** giảm đều **10 SWP/ngày** (60 SWP ÷ 6 khoảng cách giữa 7 ngày của
Iteration), để đường lý tưởng về đúng **0** ở Ngày 7 — đúng định nghĩa một burndown lý tưởng
("nếu không có gì trễ thì mọi việc xong đúng lúc sprint kết thúc"). (Bản nháp trước chia cho 7
thay vì 6 khoảng, khiến Ngày 7 "kết thúc" còn lý tưởng 8.6 SWP chưa xong — tự mâu thuẫn với
chính nhãn "kết thúc"; đã sửa lại ở đây.)

**Vì sao thực tế lệch so với lý tưởng (chậm hơn, đường thực tế luôn nằm trên đường lý tưởng):**

- Đến hôm nay (Ngày 4), thực tế còn **46 SWP** trong khi lý tưởng chỉ còn **30 SWP** — lệch
  **16 SWP**, chủ yếu vì khối Todo gần như đóng băng: **8 trong 9 issue con đang Todo (33/35
  SWP) bị chặn bởi câu hỏi (Q&A) hoặc quyết định (ADR) chưa có câu trả lời từ khách hoặc từ PL**,
  không phải vì thiếu năng lực đội:
  - `#21` (7.1 — Epic giờ lái xe `FR-SCH-02`, **8 SWP/32 giờ**, nặng nhất Todo): chặn cứng bởi
    **`[CHỜ KHÁCH · Q&A No.10]`** — ngưỡng giờ lái xe RFP tự nhận là bản tóm tắt nguồn chính thức
    (`公式ソース要約`) cần khách xác nhận lại, agent không được tự suy diễn số liệu luật lao động
    (`task-breakdown.md` Phần 4). Đây cũng là lý do đường thực tế không hề nhích trong 2 ngày tới
    (Ngày 5–6 ở trên): không có cách nào bắt đầu issue này trước khi có câu trả lời.
  - `#22` (X.1 RBAC xuyên 6 màn, 8 SWP): chặn bởi `[CHỜ KHÁCH · Q&A No.33, No.34]` (ma trận phân
    quyền + phân tách dữ liệu theo kho/khu vực).
  - `#19` (6.2 nối dịch vụ bản đồ, 5 SWP) và `#17` (5.2 hàng đợi POD ngoại tuyến, 5 SWP): `#19`
    chặn bởi `[CHỜ KHÁCH · Q&A No.7]` (chưa chọn nhà cung cấp bản đồ); `#17` chặn vì ADR dự kiến
    cho hàng đợi ngoại tuyến **chưa được viết** (`02-adr/README.md`).
  - `#15` (4.2 quét mã vạch, 2 SWP): chặn bởi `[CHỜ KHÁCH · Q&A No.19]` (thiết bị cầm tay chưa
    chốt).
  - `#10` (1.3 sửa/huỷ lịch hẹn, 2 SWP) và `#20` (6.3 lý do chưa gán tuyến, 2 SWP): cả hai thuộc
    loại "cần thiết kế trước khi code" — chưa chốt layout mở rộng (`#10`) hoặc chưa rõ nguồn dữ
    liệu lý do (`#20`), chưa có thiết kế để bắt đầu.
  - `#24` (X.3, 1 SWP): phụ thuộc `ADR-0001` còn ở trạng thái `提案`, **khách hàng chưa phê duyệt**
    — cố ý tách khỏi `#8` (đã code xong) để chỉ cần sửa riêng `#24` nếu khách chọn hướng khác.
  - Chỉ `#13` (3.2 hiển thị đơn gần đây, 2 SWP) Todo **không** bị chặn bởi Q&A/ADR — đơn thuần
    chưa đến lượt vì phụ thuộc dữ liệu đầu ra của `#12` (3.1, đang In Progress) để có nhật ký loại
    trừ thật mà hiển thị.
- Từ Ngày 6–7, đường thực tế mới giảm tiếp vì 3 issue đang **In Progress** (`#23`, `#12`, `#16`,
  tổng 11 SWP) được dự kiến hoàn thành trước khi đóng Iteration — không có issue Todo nào dự kiến
  bắt đầu được trong chính Iteration 1 này vì phụ thuộc bên ngoài chưa được gỡ.
- Kết quả cuối Iteration 1 (dự kiến): còn **35 SWP Todo** y nguyên dồn sang Iteration 2 — đúng bằng
  tổng SWP của 9 issue con Todo hiện tại, vì không issue Todo nào được gỡ chặn trong chính sprint
  này.

---

## 4. Rủi ro trễ

| Rủi ro | Issue | Ảnh hưởng tới mốc nào | Hành động | Ai làm, khi nào |
|---|---|---|---|---|
| Toàn bộ Epic giờ lái xe (8 SWP/32 giờ — nặng nhất trong Todo) chưa thể bắt đầu, chặn cứng bởi câu hỏi pháp lý chưa trả lời; RFP tự nhận ngưỡng giờ lái chỉ là bản tóm tắt cần kiểm lại nguồn chính thức | `#21` (7.1, Epic `#7` `FR-SCH-02`) | Nếu Q&A No.10 không có câu trả lời trước khi đóng Iteration 1 (2026-12-01), toàn bộ 8 SWP dồn sang Iteration 2, đẩy lùi mốc hoàn thành Epic 7 thêm ít nhất 1 sprint; rủi ro pháp lý nếu agent tự suy diễn ngưỡng giờ lái thay vì chờ khách xác nhận | PM (giả định) gửi lại Q&A No.10 cho khách hàng trước 2026-11-26, xin chốt hạn trả lời chậm nhất 2026-11-28 để BE (giả định) còn đủ 3 ngày cuối sprint code `#21` |
| Quyết định phân quyền dữ liệu theo kho/khu vực chưa có câu trả lời, chặn issue dùng chung cả 6 màn cốt lõi — nếu trễ sẽ lan rủi ro ra toàn bộ backlog (không màn nào có RBAC thật trước go-live) | `#22` (X.1, cross-epic, 8 SWP — issue Todo lớn thứ nhì) | Mốc "6 màn cốt lõi sẵn sàng go-live" — thiếu RBAC thật nghĩa là mọi màn vẫn chạy với quyền giả định, không đạt Definition of Done của đề bài | PM (giả định) tổng hợp gộp Q&A No.33 + No.34 thành 1 gói câu hỏi ưu tiên cao, gửi khách trước 2026-11-26 song song với Q&A No.10 |
| `ADR-0001` (hướng xử lý `保留` — số lượng tạm giữ) còn ở trạng thái `提案`, PL tạm chốt nhưng **khách hàng chưa phê duyệt**; nếu khách chọn hướng khác, phải sửa lại cả issue phụ thuộc lẫn dữ liệu đã sinh ở issue liên quan đã Done | `#24` (X.3, cross-epic, 1 SWP) liên quan `#8` (Done, 3 SWP) | Mốc review cuối Iteration 1 (2026-12-01) — nếu khách phản hồi sau mốc này và chọn hướng khác hướng A, phải mở lại một phần `#8` đã Done, phát sinh rework ngoài kế hoạch | PM (giả định) gửi ADR-0001 cho khách duyệt trước 2026-11-27; nếu chưa có phản hồi khi đóng Iteration, giữ nguyên giả định hướng A và ghi rõ vào `PREMISE.md` để không chặn tiến độ các issue khác |

---

**Căn cứ dữ liệu:** mọi số issue, Status, Point (SWP), Giờ ước lượng lấy trực tiếp từ
`gh project item-list 1 --owner "@me" --format json --limit 50` đọc ngày 2026-11-25; lý do
lệch kế hoạch và các mã Q&A/ADR lấy từ `estimate.md` và `task-breakdown.md` cùng repo. Phần 3
(Ngày 5–7) và các dự kiến hoàn thành trong Phần 4 là suy luận hợp lý dựa trên trạng thái In
Progress/Todo hiện tại, không phải số liệu lịch sử thật từ GitHub (Project không có dữ liệu
ngày-qua-ngày thật cho một sprint giả lập).
