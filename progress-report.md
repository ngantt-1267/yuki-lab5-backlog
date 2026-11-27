# Progress Report — Milestone & Sprint Plan (giả lập)

> **Đổi cấu trúc so với bản trước:** bản đầu nhét toàn bộ 17 issue thật (24 kể cả epic) vào
> **một** sprint 7 ngày duy nhất ("Iteration 1") — PL phản hồi đúng: khối lượng việc có nhiều
> phụ thuộc chờ khách trả lời kéo dài nhiều tuần thì không gọn trong 1 sprint ngắn được. Cấu
> trúc mới:
>
> - **8 Milestone** = 8 cụm chức năng (khớp 7 Epic `#1`–`#7` sẵn có + 1 nhóm cross-epic) — mỗi
>   Milestone là một khối việc theo màn/ràng buộc, có hạn (`due date`) riêng, có thể kéo dài
>   xuyên nhiều Sprint.
> - **3 Sprint** = 3 `Iteration` đã cấu hình sẵn trên field `Iteration` của Project (`gh api
>   graphql` xác nhận field đã có sẵn 3 kỳ 7 ngày: Iteration 1 (2026-11-25→12-01), Iteration 2
>   (12-02→12-08), Iteration 3 (12-09→12-15) — không phải tự tạo thêm) — dùng làm nhịp lặp
>   chung cho mọi Milestone. Mỗi sprint chỉ làm **một phần** của từng cụm chức năng, ưu tiên
>   phần không bị chặn trước, đẩy phần phụ thuộc khách/ADR chưa có ra sprint sau.
> - Đã gán thật trên GitHub: 8 Milestone tạo bằng `gh api repos/.../milestones`, toàn bộ 24
>   issue gán `--milestone` + field `Iteration` bằng `gh project item-edit --iteration-id`
>   (đọc lại bằng `gh project item-list 1 --owner "@me"` ngày 2026-11-26 để xác nhận đã ghi
>   đúng, không suy đoán).
> - **Vì sao vẫn 3 Sprint, không nhiều/ít hơn:** đã kiểm cả đề bài LAB-5 lẫn LAB-1
>   (`Effort Estimation.xlsx`) — không nơi nào chốt sẵn số dev/QA (LAB-1 tự ghi rõ ở mục
>   "Overall Assumptions": lịch trình và bố trí nhân sự nằm ngoài phạm vi ước lượng, hẹn ở file
>   `05_Resource plan` không có trong bộ deliverable). PL tự chọn **đội giả định 3 dev + 1.5 QA**
>   (ghi rõ ở `PREMISE.md` Phần 2 và `README.md`, sau khi cân nhắc qua 4 dev+2 QA và 3 dev+1 QA).
>   Năng lực: dev = 3×5×7 = **105 giờ/tuần**, QA = 1.5×5×7 = **52.5 giờ/tuần**. Soát từng sprint:
>   Sprint 1 (100h dev/~42h QA) và Sprint 2 (28h dev/~12h QA) đều vừa; Sprint 3 (112h dev/~47h
>   QA) — QA vừa (90%), dev vượt nhẹ **7 giờ** (~107%, chưa tới 1/3 ngày công cả 3 dev) — quá nhỏ
>   để cần thêm sprint. Số 3 Sprint giữ nguyên **không phải vì năng lực đội vừa khít**, mà thêm
>   một lý do độc lập: 28/60 SWP (toàn bộ nhóm Sprint 3) còn bị chặn cứng bởi Q&A khách/ADR chưa
>   viết — độ trễ nằm ở **lịch trình chờ khách trả lời**, tăng cỡ đội không rút ngắn được khoảng
>   chờ đó, nên dù năng lực có dư tới đâu Sprint 3 vẫn không thể bắt đầu sớm hơn.

---

## 1. Milestone overview — 8 cụm chức năng

| Milestone | Khớp Epic | Due date | Issue con | Sprint chứa issue con |
|---|---|---|---|---|
| `M1` SCR-D1-02 Nhập kiểm phẩm, nhập hàng | `#1` | 2026-12-08 | `#8`,`#9`,`#10` | S1: `#8`,`#9` · S2: `#10` |
| `M2` SCR-D1-03 Cách ly và phán quyết | `#2` | 2026-12-01 | `#11` | S1: `#11` |
| `M3` SCR-D4-01 Đặt hàng và phân bổ | `#3` | 2026-12-08 | `#12`,`#13` | S1: `#12` · S2: `#13` |
| `M4` SCR-D4-03 Xếp hàng và kiểm chứng | `#4` | 2026-12-15 | `#14`,`#15` | S1: `#14` · S3: `#15` |
| `M5` SCR-D4-05 Xác nhận giao hàng (POD) | `#5` | 2026-12-15 | `#16`,`#17` | S1: `#16` · S3: `#17` |
| `M6` SCR-D5-01 Lập tuyến và công bố | `#6` | 2026-12-15 | `#18`,`#19`,`#20` | S1: `#18` · S2: `#20` · S3: `#19` |
| `M7` FR-SCH-02 Giới hạn giờ lái xe | `#7` | 2026-12-15 | `#21` | S3: `#21` |
| `M8` Nợ kỹ thuật & quyết định chờ duyệt xuyên epic | — (cross-epic) | 2026-12-15 | `#22`,`#23`,`#24` | S1: `#23` · S2: `#24` · S3: `#22` |

**Vì sao due date lệch nhau:** `M2` chỉ có 1 issue gọn trong Sprint 1 nên đóng sớm nhất
(2026-12-01). `M1`/`M3` có 1 issue cần quyết định thiết kế thêm (không chờ khách) nên kéo sang
Sprint 2, due 2026-12-08. `M4`/`M5`/`M6`/`M7`/`M8` đều có ít nhất một issue bị chặn bởi Q&A
khách hoặc ADR chưa viết/chưa duyệt — đẩy xa nhất tới Sprint 3, due 2026-12-15 (hạn chót toàn
dự án giả lập, không đẩy xa hơn được nữa).

---

## 2. Vì sao issue nằm ở sprint nào — nguyên tắc chia

Mỗi Milestone **không** dồn hết issue con vào Sprint 1 nữa; chia theo mức sẵn sàng thật của
từng issue, cùng một nguyên tắc áp cho cả 8 Milestone:

| Sprint | Tiêu chí xếp vào | Issue | Tổng SWP |
|---|---|---|---|
| **Sprint 1** (2026-11-25→12-01) | Đã có đủ thiết kế, không chờ ai — code được ngay, hoặc đang chạy thật | `#8`,`#9`,`#11`,`#12`,`#14`,`#16`,`#18`,`#23` | 25 |
| **Sprint 2** (2026-12-02→12-08) | Cần một quyết định **nội bộ** (PL/thiết kế tự chốt được, không phải chờ khách) trước khi code | `#10`,`#13`,`#20`,`#24` | 7 |
| **Sprint 3** (2026-12-09→12-15) | Chặn cứng bởi Q&A khách chưa trả lời, hoặc ADR dự kiến **chưa viết** | `#15`,`#17`,`#19`,`#21`,`#22` | 28 |
| **Tổng** | | 17 issue | **60** (khớp `estimate.md` Phần 4) |

Lý do xếp từng issue Sprint 2/3 — không phải chọn tuỳ ý:

- **Sprint 2 (nội bộ tự chốt được):** `#10` (layout mở rộng sửa/huỷ lịch hẹn — PL/designer tự
  vẽ thêm, không cần khách) · `#13` (chỉ chờ dữ liệu đầu ra thật của `#12`, cùng Milestone,
  `#12` xong trong Sprint 1 nên `#13` làm được ngay đầu Sprint 2) · `#20` (chờ PL chọn mở rộng
  bảng `allocation_block` hay bảng riêng — quyết định kỹ thuật nội bộ) · `#24` (chờ PL duyệt
  nội bộ hướng A của `ADR-0001`, không phải chờ khách — xem `PREMISE.md` §2).
- **Sprint 3 (chặn cứng bởi bên ngoài):** `#15` (`[CHỜ KHÁCH · Q&A No.19]` thiết bị quét mã) ·
  `#17` (ADR hàng đợi POD ngoại tuyến **chưa viết**, xem `02-adr/README.md`) · `#19` (`[CHỜ
  KHÁCH · Q&A No.7]` nhà cung cấp dịch vụ bản đồ) · `#21` (`[CHỜ KHÁCH · Q&A No.10]` ngưỡng giờ
  lái xe, nặng nhất — 8 SWP) · `#22` (`[CHỜ KHÁCH · Q&A No.33, No.34]` RBAC + phân tách dữ
  liệu, rộng nhất — chạm cả sáu màn).

Epic (issue cha, SWP=0) được gán Iteration theo đúng sprint mà issue con **cuối cùng** của nó
dự kiến xong, để Project hiện epic "đóng" đúng lúc: `#2`→S1 · `#1`,`#3`→S2 · `#4`,`#5`,`#6`,`#7`→S3.

---

## 3. Trạng thái hiện tại (đọc lại GitHub Project ngày 2026-11-26)

"Hôm nay" trong kịch bản vẫn là **2026-11-28** (ngày thứ 4 của Sprint 1) — không đổi mốc thời
gian giả lập, chỉ đổi cách chia issue vào Milestone/Sprint.

| Trạng thái | Issue con/cross-epic (17) | SWP | Sprint |
|---|---|---|---|
| Done | `#8`,`#9`,`#11`,`#14`,`#18` | 14 | cả 5 đều ở Sprint 1 |
| In Progress | `#12`,`#16`,`#23` | 11 | cả 3 đều ở Sprint 1 |
| Todo | `#10`,`#13`,`#15`,`#17`,`#19`,`#20`,`#21`,`#22`,`#24` | 35 | 4 ở Sprint 2 (`#10`,`#13`,`#20`,`#24`), 5 ở Sprint 3 (`#15`,`#17`,`#19`,`#21`,`#22`) |

**Điểm đáng chú ý — khớp ngay giữa trạng thái thật và sprint đã xếp, không phải gượng ép cho
vừa:** toàn bộ 8 issue xếp vào Sprint 1 đều đang **Done hoặc In Progress** (không issue nào
Todo trong Sprint 1); toàn bộ 9 issue Todo đều nằm ở Sprint 2/3 — đúng nguyên tắc "Sprint 1 chỉ
chứa việc không chờ ai", xác nhận cách chia ở Phần 2 phản ánh đúng thực tế thay vì áp đặt
ngược.

---

## 4. Burndown Sprint 1 (sprint đang chạy — 25 SWP, 8 issue)

Chỉ tính 25 SWP của 8 issue **thuộc Sprint 1** (khác bản trước tính cả 60 SWP của toàn bộ
backlog vào một sprint) — burndown giờ phản ánh đúng khối lượng **thật sự cam kết trong sprint
này**, không pha trộn việc của Sprint 2/3.

| Ngày | Lý tưởng (SWP còn lại) | Thực tế/dự kiến (SWP còn lại) | Issue hoàn thành trong ngày |
|---|---|---|---|
| 2026-11-25 (Ngày 1) | 25.0 | 25 | — |
| 2026-11-26 (Ngày 2) | 20.8 | 23 | `#9` (2 SWP) |
| 2026-11-27 (Ngày 3) | 16.7 | 17 | `#8` (3), `#11` (3) |
| 2026-11-28 (Ngày 4 — **hôm nay**) | 12.5 | 11 | `#14` (3), `#18` (3) |
| 2026-11-29 (Ngày 5) | 8.3 | 11 | — |
| 2026-11-30 (Ngày 6) | 4.2 | 6 | `#23` (5, đang In Progress, dự kiến xong) |
| 2026-12-01 (Ngày 7 — kết thúc Sprint 1) | 0.0 | 0 | `#12` (3), `#16` (3) (2 issue In Progress còn lại, dự kiến xong) |

**Cách tính Lý tưởng:** 25 SWP ÷ 6 khoảng cách giữa 7 ngày ≈ 4.17 SWP/ngày, về đúng 0 ở Ngày 7.
Thực tế lệch nhẹ (Ngày 4 còn 11 so với lý tưởng 12.5 — **nhanh hơn** lý tưởng, vì Sprint 1 chỉ
chứa việc không bị chặn nên tiến độ đều hơn hẳn bản burndown cũ) và dự kiến về đúng 0 khi đóng
sprint — khác hẳn bản cũ (còn tồn 35 SWP Todo dồn sang sprint sau do nhét lẫn việc bị chặn vào
chung một sprint).

---

## 5. Sprint 2 & Sprint 3 — kế hoạch (chưa bắt đầu, lấy làm dự báo)

| Sprint | SWP | Issue | Rủi ro chính |
|---|---|---|---|
| **Sprint 2** (2026-12-02→12-08) | 7 | `#10`,`#13`,`#20`,`#24` | Thấp — cả 4 issue chỉ chờ quyết định **nội bộ** (PL/thiết kế), không phụ thuộc khách trả lời. Rủi ro duy nhất: PL trì hoãn tự chốt `ADR-0001` (`#24`) hoặc thiết kế mở rộng (`#10`,`#20`) chậm hơn 1 sprint |
| **Sprint 3** (2026-12-09→12-15) | 28 | `#15`,`#17`,`#19`,`#21`,`#22` | **Cao** — cả 5 issue đều chặn cứng bởi bên ngoài (4 Q&A khách chưa trả lời + 1 ADR chưa viết). Đây là sprint nặng nhất (28/60 SWP = 47% tổng backlog) vì cố ý dồn toàn bộ phần phụ thuộc ngoài vào cuối, để Sprint 1–2 không bị khối Todo-chờ-khách làm đóng băng tiến độ như bản kế hoạch cũ |

---

## 6. Rủi ro trễ

| Rủi ro | Issue | Sprint/Milestone ảnh hưởng | Hành động | Ai làm, khi nào |
|---|---|---|---|---|
| Ngưỡng giờ lái xe pháp lý chưa xác nhận — RFP tự nhận chỉ là bản tóm tắt cần kiểm lại nguồn chính thức | `#21` (nặng nhất Sprint 3 — 8 SWP) | `M7`, Sprint 3, due 2026-12-15 | PM (giả định) gửi lại Q&A No.10 trước 2026-11-26, xin chốt hạn trả lời **chậm nhất đầu Sprint 3** (2026-12-09) để còn đủ thời gian code trong sprint | PM (giả định) |
| Ma trận RBAC + phân tách dữ liệu kho/khu vực chưa có câu trả lời, chạm cả 6 màn cốt lõi | `#22` (rộng nhất Sprint 3 — 8 SWP) | `M8`, Sprint 3, due 2026-12-15 | Gộp Q&A No.33+No.34 thành 1 gói ưu tiên cao, gửi khách song song Q&A No.10, xin trả lời trước đầu Sprint 3 | PM (giả định) |
| `ADR-0001` (hướng xử lý `保留`) PL tạm chốt, khách **chưa phê duyệt**; nếu khách chọn hướng khác phải sửa lại `#24` và một phần `#8` đã Done | `#24` (Sprint 2, 1 SWP) liên quan `#8` (Done, Sprint 1) | `M1`, `M8` | Gửi ADR-0001 cho khách duyệt trước khi đóng Sprint 1 (2026-12-01); nếu chưa có phản hồi khi vào Sprint 2, giữ giả định hướng A, PL tự chốt nội bộ để `#24` không bị đẩy tiếp sang Sprint 3 | PM (giả định) |
| Dồn 47% tổng SWP (28/60) vào Sprint 3 vì toàn bộ phần chờ khách nằm ở đó — nếu **nhiều hơn 1** Q&A trễ cùng lúc, Sprint 3 vỡ kế hoạch toàn bộ, không còn sprint dự phòng (2026-12-15 là hạn chót giả lập) | `#15`,`#17`,`#19`,`#21`,`#22` | tất cả Milestone có issue ở Sprint 3 | Ưu tiên gửi cả 4 gói Q&A (No.7, No.10, No.19, No.33/34) ngay từ Sprint 1, không chờ tới Sprint 2 mới hỏi — giảm rủi ro cộng dồn | PM (giả định), bắt đầu ngay 2026-11-26 |

---

**Căn cứ dữ liệu:** 8 Milestone tạo thật qua `gh api repos/ngantt-1267/yuki-lab5-backlog/milestones`;
toàn bộ 24 issue gán `--milestone` qua `gh issue edit` và field `Iteration` qua
`gh project item-edit --iteration-id`, cả hai đã chạy thật và xác nhận exit code 0 cho từng
issue (không phải mô tả suông). Trạng thái Status/Point(SWP)/Giờ giữ nguyên, lấy lại từ
`gh project item-list 1 --owner "@me"` đọc ngày 2026-11-26 — không đổi so với `estimate.md`
Phần 4 (vẫn 60 SWP/240 giờ, không issue nào đổi điểm). Phần 4 (Sprint 1) là dữ liệu đã có sẵn từ
bản progress-report trước, chỉ tính lại Lý tưởng theo 25 SWP thay vì 60; Phần 5 (Sprint 2/3) là
dự báo, chưa có dữ liệu ngày-qua-ngày thật (sprint chưa bắt đầu trong kịch bản giả lập).
