# Task Breakdown — YUKI SYSTEM LAB-5

> Nguồn: 6 screen spec + kiến trúc + ADR của LAB-4 (repo `yuki-lab2-prototype`, PRIVATE, giữ
> nguyên — chỉ đọc). Project thật: https://github.com/users/ngantt-1267/projects/1 — repo
> `ngantt-1267/yuki-lab5-backlog`, 7 epic `#1`–`#7`, 17 issue con `#8`–`#24`. Mọi số issue dưới
> đây là số thật đã tạo ở Project, mở lên tra được, không phải số nháp.

---

## 1 · Nguyên tắc chia task

### Độ hạt — dừng ở mức THÔ

Một issue = **một cụm chức năng cố kết trong một khu màn**, theo đúng cách mục ①Layout của từng
screen spec LAB-4 đã nhóm các vùng A/B/C... lại thành một luồng nghiệp vụ. **Không** chẻ xuống:

- một vùng-chữ-cái đơn lẻ (ví dụ không tách riêng "vùng C" thành issue của chính nó),
- một bước trong sequence diagram (`Detail Design.xlsx` sheet `Seq`),
- một API endpoint riêng lẻ.

Phần lớn **một màn = một issue**. Chỉ tách thêm issue con trong cùng epic khi gặp một trong hai
trường hợp: **(a)** màn gộp hai luồng người dùng khác nhau trên cùng một trang (`SCR-D1-02` gộp
`SCR-D1-01`, tách ra ba issue `#8/#9/#10` vì ba luồng khác hẳn nhau về mức độ sẵn sàng thiết kế),
hoặc **(b)** một khoảng cách kiến trúc đủ lớn và đủ tách biệt để code song song với luồng chính
của màn (ví dụ tích hợp bản đồ `#19`, hàng đợi POD ngoại tuyến `#17`).

Lý do chọn mức THÔ thay vì mịn hơn: đòn bẩy lớn nhất để kịp deadline 2026-11-29, và giữ tổng số
issue trong dải mục tiêu 20–35 (thực tế: 24 issue — 7 epic + 17 issue con, xem mục "Tổng" cuối
phần này).

### Định nghĩa xong (Definition of Done)

Một issue được coi là **xong** khi nội dung của nó viết đủ chi tiết **ngang mức detail design
LAB-4** cho đúng phạm vi của issue đó:

- Trích đủ nguồn RFP (mã + số trang) và/hoặc tên file screen spec LAB-4 làm căn cứ.
- Nêu đủ ràng buộc nghiệp vụ đặc thù nếu có (ví dụ `BR-TEMP-02` chặn tuyệt đối, thứ tự sáu bước
  loại trừ không đổi).
- Mọi phụ thuộc vào Q&A chưa trả lời hoặc ADR chưa duyệt phải được **gọi tên rõ** (mã Q&A, mã
  ADR) — không còn chỗ nào đánh dấu `[TBD]` mà không trỏ được về đâu. Một `[TBD]` hợp lệ phải trỏ
  về một trong ba nơi: `PREMISE.md` (Phase 7, cùng repo), một issue làm rõ mang số thật, hoặc một
  câu hỏi còn mở có ghi lý do để mở (xem Phần 4 của tài liệu này).

### Cách dùng epic → issue → sub-issue trên GitHub Project thật

- **Epic** = issue cha, mang label `epic`, mỗi epic ứng với một màn cốt lõi (epic `#1`–`#6`) hoặc
  một ràng buộc kiến trúc đủ lớn để đứng riêng (epic `#7` — xem Phần 3).
- **Issue con** nối vào epic bằng quan hệ **sub-issue thật của GitHub** — tạo bằng
  `gh issue create --parent <số epic>` (có từ `gh` v2.94.0 trở lên), **không** dùng task-list
  markdown giả làm phương án thay thế.
- Khi epic cha đã nằm trong Project, issue con tạo bằng `--parent` **tự động được thêm vào
  Project** theo quan hệ sub-issue — không cần gọi `gh project item-add` riêng cho issue con.
- Ba issue "nợ kỹ thuật xuyên epic / phụ thuộc quyết định chờ duyệt" (`#22`, `#23`, `#24`) **không**
  gắn vào một epic nào — mang label `cross-epic`, đứng độc lập trên Project để tránh lặp cùng một
  ràng buộc ở nhiều epic (vi phạm DRY nếu lặp).
- Project có field `Status` (Single-select: Todo / In Progress / Done) dùng để theo dõi tiến độ;
  chuyển một item sang `Done` tự động đóng (close) issue tương ứng — đặc điểm mặc định của
  GitHub Projects v2, dùng làm bằng chứng tự nhiên cho báo cáo tiến độ (`progress-report.md`).

### Tổng issue trên Project

| Loại | Số lượng | Số issue |
|---|---|---|
| Epic (issue cha) | 7 | `#1`–`#7` |
| Issue con trong epic | 14 | `#8`–`#21` |
| Issue cross-epic (không gắn epic) | 3 | `#22`, `#23`, `#24` |
| **Tổng** | **24** | — |

---

## 2 · Spec → Epic → Issue

| Spec | Epic | Issue/sub-issue | Phần spec chưa thành issue và vì sao |
|---|---|---|---|
| `specs/05-screen-spec/scr-d1-02-nhap-kiem-pham.md` (gộp phần tạo mới của `SCR-D1-01`) | Epic `#1` | `#8` (1.1 ghi nhận kiểm hàng nhập, ba loại số lượng, cách ly tự động) · `#9` (1.2 đăng ký lịch hẹn mới qua overlay H) · `#10` (1.3 — `SCR-D1-01` phần sửa/huỷ/lọc lịch hẹn) | Kênh tiếp nhận lịch hẹn qua tích hợp hệ thống nhà cung cấp chưa thành issue — RFP không nói rõ kênh nhận (`[CẦN XÁC NHẬN]`, `trang-thai-quyet-dinh.md` §5), `#10` chỉ bao phủ con đường nhập tay đang dùng |
| `specs/05-screen-spec/scr-d1-03-cach-ly-phan-quyet.md` | Epic `#2` | `#11` (2.1 danh sách tồn kho cách ly + phán quyết giải phóng/huỷ + lịch sử) | Vùng E "cách ly lại hàng đã giải phóng" không thành issue — RFP không đòi (`[RFP tr.22]` vòng đời tồn kho một chiều), chỉ là câu hỏi `[CẦN XÁC NHẬN]` chưa có thiết kế nào để chia thành issue |
| `specs/05-screen-spec/scr-d4-01-dat-hang-va-phan-bo.md` | Epic `#3` | `#12` (3.1 đăng ký đơn + phân bổ theo đúng sáu bước loại trừ) · `#13` (3.2 hiển thị đơn gần đây + nhật ký loại trừ) | Không có phần bỏ sót — toàn bộ vùng B/C/D/E/F đã phủ |
| `specs/05-screen-spec/scr-d4-03-xep-hang-va-kiem-chung.md` | Epic `#4` | `#14` (4.1 kiểm xếp hàng, hai cửa chặn nhiệt) · `#15` (4.2 quét mã vạch thay nhập tay) | Không có phần bỏ sót — `#15` ghi rõ thiết bị cầm tay chưa chốt (`Q&A No.19`) thay vì bỏ qua khỏi backlog |
| `specs/05-screen-spec/scr-d4-05-xac-nhan-giao-hang.md` | Epic `#5` | `#16` (5.1 ghi nhận kết quả giao + bốn khoá bằng chứng POD) · `#17` (5.2 hàng đợi bằng chứng giao hàng ngoại tuyến) | Không có phần bỏ sót |
| `specs/05-screen-spec/scr-d5-01-lap-tuyen-va-cong-bo.md` | Epic `#6` | `#18` (6.1 form công bố tuyến, quản phiên bản) · `#19` (6.2 nối dịch vụ bản đồ) · `#20` (6.3 hiện lý do đơn chưa gán tuyến) | Thông báo tài xế nhận bản tuyến mới nhất (`FR-SCH-04` vế 1) và xe đa dải nhiệt (giả định của prototype, RFP không nói) không tách issue riêng — gộp làm ghi chú DoD trong `#18`, vì quy mô quá nhỏ để code song song (đúng nguyên tắc độ hạt THÔ) |
| `specs/01-kien-truc/kien-truc-he-thong.md` §9 dòng 3, dòng 4 (`FR-SCH-02` giới hạn giờ lái xe + khoá `rule_version` theo luật tại thời điểm công bố) | Epic `#7` (epic riêng) | `#21` (7.1) | Không có phần bỏ sót — cả hai dòng gộp chung một issue vì cùng một mô hình dữ liệu `rule_version` trên bảng `route` |
| `specs/02-adr/adr-0001-trang-thai-ton-kho-cua-so-luong-tam-giu.md` + hai ADR dự kiến chưa viết trong `02-adr/README.md` (ADR giờ lái xe, ADR hàng đợi POD) | Cross-epic / theo màn | `#24` (X.3 — ADR-0001 đã viết, chờ duyệt) · ADR giờ lái xe gắn vào `#21` · ADR hàng đợi POD gắn vào `#17` | Không có phần bỏ sót |
| `specs/01-kien-truc/kien-truc-he-thong.md` §6 (bảng "Một giao dịch?") + §7 (chống gửi lại) | Cross-epic | `#23` (X.2 — gộp giao dịch nguyên tử cho ba luồng ghi hai bước + chống gửi lại `SCR-D4-01`) | Không có phần bỏ sót |
| `specs/00-truy-vet/trang-thai-quyet-dinh.md` §2 (`Q&A No.33` ma trận RBAC · `Q&A No.34` phân tách dữ liệu dòng, chạm cả sáu màn) | Cross-epic | `#22` (X.1) | Không có phần bỏ sót — gộp một issue duy nhất dùng chung cho cả sáu màn, không lặp lại ở từng epic (giữ DRY) |

**Phần spec ngoài 6 màn cốt lõi — không thành issue nào, có chủ đích:** 25 màn còn lại trong 31
màn của `ma-tran-truy-vet.md` §2 (kể cả 6 màn gánh mã P0 bị hoãn: `SCR-D2-03`, `SCR-D4-04`,
`SCR-D4-06`, `SCR-D6-02`, `SCR-D7-02`, `SCR-D8-02`) **không có screen spec LAB-4** — đưa vào
backlog LAB-5 là tự ý mở rộng phạm vi ngoài những gì LAB-4 đã thiết kế, nên không có issue nào
cho các màn này.

---

## 3 · Hạng mục chịu ràng buộc đặc thù của đề

| Ràng buộc | Issue | Vì sao tách riêng |
|---|---|---|
| Giới hạn giờ lái xe tải từ 2024 (`FR-SCH-02` `[RFP tr.34]`) | Epic `#7` + issue con `#21` | **Tách epic riêng, không gộp vào epic `#6` (`/routes`)**, vì bốn lý do cộng dồn: (a) đề bài LAB-5 đòi ràng buộc đặc thù phải "ảnh hưởng tách bạch" tới việc break task và ước lượng effort — gộp chung sẽ làm mờ ranh giới đó; (b) kiến trúc `§9` dòng 3–4 liệt nó ở tầm hệ thống (bảng `route` chưa có cột `rule_version`, ảnh hưởng toàn mô hình dữ liệu tuyến, không riêng một màn); (c) effort ước lượng khác hẳn việc CRUD thông thường của `/routes` — cần nguồn dữ liệu luật lao động bên ngoài hệ thống, trong khi chính RFP tự nhận danh sách ngưỡng giờ lái là bản tóm tắt cần kiểm lại (`[CẦN XÁC NHẬN]`, `trang-thai-quyet-dinh.md` §1); (d) rủi ro pháp lý nếu tự suy diễn sai ngưỡng giờ — cao hơn hẳn rủi ro của một lỗi UI thông thường, và còn bị chặn cứng bởi `Q&A No.10` chưa trả lời, nên tách riêng để không làm chậm toàn bộ epic `#6` trong lúc chờ khách |
| `保留数量` (số lượng tạm giữ) sinh hai bản ghi tồn kho + hai dòng lịch sử (`ADR-0001`) | Issue cross-epic `#24` (X.3), tách khỏi `#8` | Đây là phần duy nhất trong Epic `#1` phụ thuộc một quyết định **PL tạm chốt, khách chưa phê duyệt** (`ADR-0001` trạng thái `提案`) — tách khỏi `#8` (đã "chốt" ở mức PL, có thể code ngay) để nếu khách trả lời khác hướng A, chỉ cần sửa lại `#24` mà không phải mở lại toàn bộ issue kiểm hàng nhập |
| Lệch dải nhiệt chặn tuyệt đối, không có đường ghi đè (`BR-TEMP-02` `[RFP tr.21]`) | Xuất hiện lặp ở `#8`, `#11`, `#14`, `#18` nhưng **không** gộp thành issue riêng | Khác hai ràng buộc trên, đây không tách thành issue riêng vì không sinh ra khối lượng công việc độc lập — là một điều kiện kiểm tra phải lặp lại đúng y hệt ở mọi nơi chạm luồng nghiệp vụ nhiệt độ; ghi vào DoD của từng issue liên quan thay vì tạo issue "ràng buộc nhiệt độ" tách rời không ai code được riêng |

---

## 4 · Chỗ hở/mâu thuẫn spec LAB-4 phát hiện khi break

| Spec | Chỗ hở/mâu thuẫn | Xử lý |
|---|---|---|
| `specs/02-adr/adr-0001-trang-thai-ton-kho-cua-so-luong-tam-giu.md` | Trạng thái `提案`, PL tạm chốt 2026-11-07, **Yuki chưa phê duyệt**, nhưng issue `#8`/`#24` phải code theo hướng A (sinh tồn kho ở trạng thái `隔離中`) để không bị treo | Giả định trỏ `PREMISE.md` — `PREMISE.md` của repo này (Phase 7) sẽ ghi lại hướng A là giả định PL tạm chốt, chưa phải quyết định khách; `#24` giữ nhãn riêng "phụ thuộc quyết định chờ duyệt", tách khỏi `#8` (xem Phần 3) |
| `specs/01-kien-truc/kien-truc-he-thong.md` §6 (bảng "Một giao dịch?") + §7 (chống gửi lại) | Ba màn `SCR-D1-03`, `SCR-D4-01`, `SCR-D4-03` ghi nhiều bước không khoá giao dịch nguyên tử (`[TBD]` lặp lại ở cả ba) + `SCR-D4-01` thiếu `requestKey` chống gửi lại, trong khi `SCR-D1-02`/`SCR-D4-05`/`SCR-D5-01` đã có cả hai | Tạo issue làm rõ `#23` (X.2) — gộp chung một issue vì cùng một nguyên nhân gốc (ghi nhiều bước không khoá giao dịch), tránh lặp ba lần ở ba epic |
| `specs/01-kien-truc/kien-truc-he-thong.md` §9 dòng 3–4 + `specs/02-adr/README.md` | `FR-SCH-02` giới hạn giờ lái xe chưa có cả ADR lẫn thiết kế màn; ngưỡng giờ lái RFP tự nhận là bản tóm tắt nguồn chính thức (`公式ソース要約`) cần kiểm lại | Để mở và vì sao — chặn cứng bởi `[CHỜ KHÁCH · Q&A No.10]` (ngưỡng pháp lý), agent không được tự suy diễn số liệu luật lao động; đã tạo issue `#21` loại "cần thiết kế trước khi code" để giữ chỗ đúng vị trí trong backlog, không bỏ sót khỏi Project |
| `specs/00-truy-vet/trang-thai-quyet-dinh.md` §2 | `Q&A No.33` (ma trận RBAC vai × màn × thao tác) và `Q&A No.34` (phân tách dữ liệu mức dòng) chạm cả sáu màn cốt lõi, khách chưa trả lời câu nào trong 34 câu Q&A đã khoá | Tạo issue làm rõ `#22` (X.1) — một issue dùng chung cho cả sáu màn, không lặp lại ở từng epic |
| `specs/00-truy-vet/ma-tran-truy-vet.md` §1 (`SCR-D1-01`) | Phần sửa/huỷ/lọc lịch hẹn nhập hàng theo ngày và nhà cung cấp **chưa có cả thiết kế lẫn mã** — khác hẳn phần "tạo mới" đã có thiết kế trọn vẹn (overlay H) | Tạo issue làm rõ `#10` — mang loại "cần thiết kế trước khi code", không gộp lẫn với `#8`/`#9` (loại "thi công bình thường") để tránh ước lượng sai effort |
| `specs/05-screen-spec/scr-d1-03-cach-ly-phan-quyet.md` vùng E + `trang-thai-quyet-dinh.md` §5 | `[RFP tr.22]` mô tả vòng đời tồn kho một chiều, nhưng `[LAB-2 · TD-06]` từng nêu nhu cầu cho một đơn vị đã giải phóng quay lại cách ly — hai nguồn chưa khớp hướng | Để mở và vì sao — chưa có thiết kế nào để chia thành issue; nếu khách xác nhận "có", một issue mới sẽ phát sinh trong Epic `#2` sau khi có câu trả lời, đưa trước vào backlog lúc này là tự ý mở rộng phạm vi |
| `specs/05-screen-spec/scr-d4-03-xep-hang-va-kiem-chung.md` mục D-0 | Câu "mọi lần chặn đều ghi lịch sử" không khớp luồng xử lý thật — chỉ hai trong bốn nhánh chặn gọi được hàm ghi lịch sử (nhánh còn lại return sớm trước khi tới bước ghi) | Đã sửa thiết kế trỏ `PREMISE.md` — ghi nhận là chỗ hở phát hiện khi break `#14`, đẩy hướng sửa (chuyển bước ghi lịch sử lên trước mọi nhánh return, hoặc sửa lại câu D-0 cho khớp luồng thật) vào `PREMISE.md` (Phase 7) để Phase 7 chốt một hướng và trỏ ngược lại `#14` |
| `specs/05-screen-spec/scr-d4-05-xac-nhan-giao-hang.md` | `FR-OUT-06` `[RFP tr.30]` liệt vị trí giao hàng (位置情報) là một khoá bằng chứng POD phải có, nhưng thiết kế hiện tại để trường này **tuỳ chọn**, không bắt buộc | Giả định trỏ `PREMISE.md` — issue `#16` giữ nguyên tuỳ chọn như giả định làm việc hiện tại; `PREMISE.md` (Phase 7) ghi lại đây là giả định LAB-4 tự chốt, chưa được khách duyệt |
| `specs/05-screen-spec/scr-d5-01-lap-tuyen-va-cong-bo.md` vùng E (cột 拒否理由) | Chưa rõ nguồn dữ liệu của lý do đơn chưa được gán tuyến — bảng `allocation_block` hiện chỉ ghi lý do loại lô ra khỏi phân bổ, không ghi lý do một đơn đã phân bổ nhưng chưa xếp được vào tuyến nào | Tạo issue làm rõ `#20` — issue 6.3 đã tự mang nhãn "cần thiết kế trước khi code", đúng vì chính chỗ hở này |
| `specs/05-screen-spec/scr-d4-03-xep-hang-va-kiem-chung.md` 4.2 + `trang-thai-quyet-dinh.md` §2 | `Q&A No.19` (thiết bị cầm tay và cách quét mã) chưa được khách trả lời; LAB-2 hiện chỉ đối chiếu được hai trong năm thứ cần đối chiếu chéo khi xếp hàng (xe, niêm phong) bằng nhập tay | Tạo issue làm rõ `#15` — issue 4.2 đã tự mang nhãn "cần thiết kế trước khi code", đúng vì chính câu hỏi này |

**Tổng:** 10 chỗ hở/mâu thuẫn phát hiện khi break backlog — 2 "giả định trỏ PREMISE.md", 1 "đã
sửa thiết kế trỏ PREMISE.md", 4 "tạo issue làm rõ #số thật", 3 "để mở và vì sao" (một trong ba là
chặn bởi câu hỏi pháp lý `Q&A No.10`, không phải lỗi bỏ sót).
