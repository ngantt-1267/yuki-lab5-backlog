# Skill: chấm SWP (Scope × Complexity → SWP)

Chấm điểm SWP cho một issue backlog LAB-5 (YUKI SYSTEM), tất định và giải trình được, rồi (tuỳ
chọn) ghi kết quả lên field NUMBER của GitHub Project.

## Khi nào dùng

- Phase 5 (`estimate.md`) cần cột "Skill chấm" cho mỗi issue trong backlog.
- Bất kỳ lúc nào cần ước lượng nhanh một issue theo đúng cùng một quy tắc đã áp cho cả backlog
  (không được đổi quy tắc giữa chừng — xem `development-rules.md` nguyên tắc DRY/nhất quán).

## Không làm gì

- Không tự tạo GitHub Project (xem Phase 3 của plan LAB-5).
- Không tự tạo field Iteration — field đó CLI/GraphQL không tạo được, PL phải tạo tay qua giao
  diện web Project một lần (xem mục "Giới hạn đã biết" trong `ghi-len-github-project.js`).
- Không tự ý ghi lên Project trừ khi được gọi rõ ràng bằng `ghi-len-github-project.js`.

## Ma trận Scope × Complexity → SWP

| Scope \ Complexity | C1 — CRUD thường | C2 — Rule nghiệp vụ nhiều bước | C3 — Ràng buộc ngoài hệ thống |
|---|---|---|---|
| **S1** — Một phần một màn | 1 | 2 | 3 |
| **S2** — Trọn một màn / một luồng ghi | 2 | 3 | 5 |
| **S3** — Nhiều màn / tầng kiến trúc | 3 | 5 | 8 |

Dãy Fibonacci Agile quen thuộc (1-2-3-5-8), xếp đường chéo tăng dần cả hai trục. Trần **8**
(không dùng 13): độ hạt issue của backlog này đã chốt là **thô** (1 issue/khu màn) — một issue
ước ra 13+ là dấu hiệu phải **tách** issue, không phải chấm 13. Định nghĩa đầy đủ từng mức, kèm
ví dụ thật từ LAB-4, nằm trong `ma-tran-diem.js`.

**Quy đổi giờ: 1 SWP = 4 giờ** (hệ số cố định, áp dụng như nhau cho mọi epic — đúng yêu cầu "quy
tắc cụ thể áp dụng nhất quán" của đề bài §estimate.md mục 3). Lý do chọn 4 và cách đổi hệ số này
ở một chỗ duy nhất: xem comment trong `ma-tran-diem.js`.

## Cách dùng

```bash
# Chấm từ file issue markdown (dòng `# Tiêu đề` đầu tiên là title, phần còn lại là body)
node cham-diem.js --file vi-du-issue/vi-du-01-scr-d4-01-them-truong-ghi-chu.md

# Chấm trực tiếp từ title/body, xuất thêm ra file
node cham-diem.js --title "..." --body "..." --out-json ket-qua.json --out-md ket-qua.md

# Ghi đè khi tự động phân loại sai (luôn ghi lý do)
node cham-diem.js --file issue.md --scope S2 --complexity C2 \
  --ly-do-ghi-de "Mô tả có đoạn giải thích rule KHÔNG áp dụng, khớp nhầm từ khoá"
```

Output gồm JSON (mức Scope, mức Complexity, SWP, giờ, có ghi đè hay không) và một đoạn lý do
đọc được, truy ngược về đúng ô ma trận đã chọn.

### Cách phân loại tự động hoạt động — và giới hạn của nó

`phan-loai-tu-khoa.js` khớp từ khoá cố định trong tiêu đề + nội dung (tiếng Việt, không phân biệt
hoa/thường). Tất định tuyệt đối: không gọi mạng, không gọi LLM, không `Math.random`. Mặc định khi
không khớp gì: Scope → S2 (đa số issue của backlog này là một khu màn), Complexity → C1 (bảo thủ,
không tự suy diễn khó).

**Giới hạn đã biết:** khớp từ khoá không hiểu phủ định — một câu mô tả kiểu "không có rule nghiệp
vụ nhiều bước" vẫn khớp từ khoá "rule nghiệp vụ". Luôn đọc lại phần "Lý do" trước khi chốt; dùng
`--scope`/`--complexity` để ghi đè kèm lý do khi tự động phân loại sai.

## Ghi lên GitHub Project (field Point/Giờ)

Đã xác minh thật bằng `gh project item-edit --help` (gh v2.101.0, không suy đoán):

```bash
# Tạo field NUMBER một lần (nếu Phase 3 chưa tạo sẵn)
gh project field-create <project-number> --owner <login> --name "SWP" --data-type NUMBER

# Ghi giá trị lên đúng issue
gh project item-edit <project-number> --owner <login> \
  --url https://github.com/<org>/<repo>/issues/<n> \
  --field "SWP" --number <giá trị>
```

`--number` là cờ dành riêng cho field kiểu NUMBER (khác `--text`/`--date`/
`--single-select-option-id`) — đây là tên cờ chính xác đã test, không phải suy đoán từ `--value`.
Wrapper tiện dụng: `ghi-len-github-project.js` (xem file để biết tham số).

**Không tạo được qua CLI/GraphQL:** field kiểu `ITERATION`. PL phải tạo tay một lần qua giao diện
web Project — việc này KHÔNG nằm trong phạm vi skill này.

## Báo cáo HTML mẫu

```bash
node sinh-bao-cao-html.js
```

Ghi ra `../../bao-cao-cham-swp/index.html` (gốc repo `yuki-lab5-backlog`) — tĩnh, mở thẳng bằng
trình duyệt, không cần server, gộp ma trận + kết quả chấm 2 issue mẫu (một đầu CRUD đơn giản, một
đầu ràng buộc giờ lái xe FR-SCH-02).

## Cấu trúc file

| File | Vai trò |
|---|---|
| `ma-tran-diem.js` | Định nghĩa Scope/Complexity/ma trận SWP/hệ số giờ — nguồn sự thật duy nhất |
| `phan-loai-tu-khoa.js` | Khớp từ khoá tất định để tự động phân loại Scope/Complexity |
| `cham-diem.js` | CLI chính: đọc issue → chấm → xuất JSON/MD |
| `ghi-len-github-project.js` | Ghi SWP/giờ lên field NUMBER của GitHub Project qua `gh` |
| `sinh-bao-cao-html.js` | Gộp kết quả thành báo cáo HTML tĩnh |
| `vi-du-issue/` | 2 issue mẫu để chạy thử đầu-cuối (hai đầu thang điểm) |
