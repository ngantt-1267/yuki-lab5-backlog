# Báo cáo cách dùng AI — LAB-5

## 1 · Skill/Agent đã dùng, prompt viết thế nào cho từng việc

Toàn bộ LAB-5 chạy trên Claude Code, điều phối qua `Agent` tool (subagent nền, không phải một
phiên chat liên tục): một agent lập kế hoạch tổng thể trước, một agent khác review độc lập hướng
đi, rồi mới phân việc cho các agent con thực thi — không có việc nào tự viết thẳng vào `specs/`
hay vào repo LAB-5 mà không qua một agent.

**Lập kế hoạch (trước khi làm bất cứ gì):** 1 agent `planner` đọc đề bài LAB-5 nguyên văn PL dán
vào, đọc các file LAB-4 liên quan (kiến trúc hệ thống §9, 2 ADR dự kiến, 6 screen spec, Detail
Design, Database Design), rồi viết một plan 10 phase dưới `plans/261124-lab5-task-breakdown-plan/`
— phase nào song song được, phase nào buộc nối tiếp vì cần số liệu thật từ phase trước.

**Phá backlog (Phase 1):** 1 agent đọc sâu 6 screen spec + 6 cặp sheet Detail Design + 24 bảng
Database Design + bảng gap kiến trúc §9 + ADR, lập bảng nháp epic/issue với yêu cầu rõ: *"áp dụng
độ hạt THÔ, 1 issue/khu màn, không chẻ xuống mức bước sequence hay API endpoint"* và *"tách ràng
buộc giờ lái xe FR-SCH-02 thành epic riêng, không gộp vào /routes"*.

**Xây và chạy skill chấm SWP (Phase 2, 5):** khoá học không phát skill chấm điểm, PL xác nhận
*"chưa có gì từ khoá học, em tự xây"*. 1 agent thiết kế ma trận Scope (3 mức) × Complexity (3 mức)
→ SWP (thang Fibonacci 1-2-3-5-8, trần 8 vì độ hạt issue đã chốt là thô), viết thành skill Node.js
chạy được thật (`skills/cham-swp/`: `ma-tran-diem.js`, `cham-diem.js`, `ghi-len-github-project.js`,
`sinh-bao-cao-html.js`), test trên 2 issue mẫu tự nghĩ (một CRUD đơn giản, một có ràng buộc ngoài
hệ thống) trước khi chấm thật trên 24 issue. Một agent khác sau đó chạy skill này trên 24 issue
thật, áp dụng quy ước đã chốt: hệ số cố định 1 SWP = 4 giờ, Point = 0 cho 7 issue Epic (tránh đếm
trùng công sức đã nằm ở issue con).

**Dùng Agent ghi SWP lên GitHub Project:** không có API riêng để "AI ghi điểm" — thực chất là gọi
đúng lệnh `gh project item-edit <n> --owner "@me" --url <issue-url> --field "<tên field>" --number
<giá trị>`, nhưng phải tự `gh project item-edit --help`/`gh project field-create --help` xác minh
tên cờ chính xác trước (không đoán), vì tài liệu CLI không ghi rõ field kiểu NUMBER dùng cờ nào.
Việc ghi 24×2 field (Point, Giờ) rồi 24 lệnh gán Iteration được viết thành vòng lặp bash gọi `gh`
tuần tự, có cơ chế chờ/thử lại khi gặp giới hạn tần suất API (xem mục 3).

**Viết báo cáo tiến độ (Phase 6):** 1 agent đọc trực tiếp dữ liệu thật trên Project qua
`gh project item-list --format json` (không dùng số tóm tắt người điều phối đưa sẵn, tự đọc lại
độc lập) để tính bảng trạng thái, rồi dựng bảng ngày×SWP còn lại (vì sprint giả lập không có dữ
liệu lịch sử ngày-qua-ngày thật) và nêu lý do lệch kế hoạch trỏ đúng Q&A/ADR đang chờ ở `task-
breakdown.md`/`estimate.md`.

## 2 · Review output AI

Quy trình review có hai lớp, khác với LAB-4 (LAB-4 tách phiên Writer/Reviewer độc lập chạy nhiều
vòng cho từng màn):

- **Lớp 1 — review hướng đi, một lần, trước khi thực thi bất cứ phase nào:** sau khi `planner`
  viết xong plan, một agent khác (`athena`, vai cố vấn chiến lược) đọc toàn bộ plan + đề bài gốc,
  tự chạy thật `gh --version`/`gh issue create --help`/`gh project field-create --help` để kiểm
  tra các giả định kỹ thuật của planner thay vì tin lời planner suông. Kết quả: phát hiện planner
  đánh giá SAI một rủi ro (lo "sub-issue qua CLI không dùng được" — thực tế dùng được, planner chưa
  test thật mà chỉ suy đoán từ hiểu biết cũ) và BỎ SÓT một rủi ro thật khác (field Iteration không
  tạo được qua CLI/GraphQL, phải tạo tay). Plan được sửa lại theo đúng 2 phát hiện này trước khi
  bất kỳ phase nào chạy.
- **Lớp 2 — tự verify sau mỗi phase, không tin báo cáo "đã xong" suông:** mỗi agent thực thi phase
  được yêu cầu tự kiểm chứng trước khi báo cáo (Phase 3 tự `gh repo view` xác nhận public, Phase 5
  tự đọc lại field trên Project sau khi ghi, Phase 8 tự gọi HTTP không xác thực để xác nhận mở
  được ẩn danh). Người điều phối (tức phiên Claude Code chính, không phải một BrSE riêng như LAB-4)
  sau đó tự kiểm tra lại một lần nữa bằng cách đọc thẳng dữ liệu thật trên GitHub Project — và thực
  sự đã bắt được một chỗ sai: một agent báo *"OK issue #12 -> Iteration 1"* nhưng khi đọc lại dữ
  liệu thật trên Project, field đó vẫn trống (tiến trình bị dừng giữa chừng do giới hạn tần suất
  API, dòng log "OK" bị in ra nhưng lệnh ghi thực tế chưa xong). Phải tự chạy lại và xác nhận bằng
  số liệu thật, không dựa vào log cũ.
- **Người review cuối cùng là PL** — đọc trực tiếp các link public (repo, Project, báo cáo HTML)
  và các file markdown đã sinh ra, chứ không có một "Reviewer agent" độc lập chạy checklist như
  `yuki-excel-spec-reviewer`/`yuki-van-phong-reviewer` của LAB-4 (chưa kịp dựng skill review riêng
  cho LAB-5 trong thời gian deadline gấp).

## 3 · Điểm đặc biệt

**Chỗ tin là hiệu quả:**
- Quy trình *lập kế hoạch → một agent khác review độc lập (chạy lệnh thật để kiểm chứng, không chỉ
  đọc lý thuyết) → mới thực thi* đã bắt được sai sót kỹ thuật thật trước khi tốn công sức build sai
  hướng — nếu không có bước này, hẳn đã tốn thời gian dựng phương án "lùi" (task-list markdown) cho
  sub-issue dù CLI thực ra đã hỗ trợ native, và đến gần cuối mới phát hiện field Iteration không
  tạo tự động được.
- Chạy song song các phase không phụ thuộc nhau (phá backlog + xây skill SWP; viết task-breakdown +
  chấm SWP) tiết kiệm thời gian thật đáng kể trong deadline chỉ còn vài ngày.
- Skill chấm SWP tất định (khớp từ khoá + tra bảng cố định, không gọi LLM chấm điểm) cho kết quả
  luôn giải trình được — chấm lại một issue nhiều lần vẫn ra cùng một điểm, dễ bảo vệ khi PL/người
  chấm bài hỏi "vì sao issue này ra điểm này".

**Chỗ chưa tốt, cần cải thiện nếu làm thật ngoài khoá học:**
- Giới hạn tần suất API GitHub (rate limit, gồm cả giới hạn phụ không hiện rõ trong hạn mức
  `/rate_limit` chính thức) là rủi ro không lường hết từ đầu — tốn thời gian thật đáng kể để retry
  bằng tay, dù đã có cơ chế chờ/thử lại tự động.
- Một agent con từng rơi vào vòng chờ không tiến triển, tự sinh nhiều thông báo lặp lại ("đang
  chờ", "chưa cần hành động") mà không thật sự tiến thêm — phải chủ động dừng agent đó (`TaskStop`)
  và người điều phối tự tiếp quản hoàn tất phần việc còn lại bằng tay (script retry có giới hạn số
  lần thử, không lặp vô hạn). Đây là bài học về giám sát agent chạy nền: không nên để một agent tự
  "chờ" một điều kiện bên ngoài (rate limit hồi phục) mà không có giới hạn thời gian/số lần rõ ràng.
- Nhiều quyết định nhỏ (độ hạt issue, cách quy SWP ra giờ, gộp/tách một vài issue biên) được agent
  tự quyết theo mặc định hợp lý (có agent cố vấn xác nhận các điểm này không thật sự chặn PL) thay
  vì PL duyệt từng điểm trước khi làm — đổi lấy tốc độ, nhưng PL chỉ xem lại các quyết định này ở
  `PREMISE.md` SAU khi mọi thứ đã xong, không phải trước. Phù hợp với deadline gấp, nhưng nếu dự án
  thật có nhiều rủi ro nghiệp vụ hơn, thứ tự này nên đảo lại.
- Chưa có cách tự động hoá hoàn toàn việc tạo field Iteration trên GitHub Project — CLI/GraphQL
  không hỗ trợ, chưa tìm ra phương án nào khác ngoài việc PL tự thao tác tay một lần qua giao diện
  web; sau bước đó thì gán giá trị Iteration cho từng issue lại tự động hoá lại được bình thường.
