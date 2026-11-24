# Kết quả chấm SWP — Thêm ghi chú phạm vi vai trên form đăng ký đơn hàng (SCR-D4-01, vùng B)

| Trục | Mức | Nhãn | Ghi đè thủ công? |
|---|---|---|---|
| Scope | S1 | Một phần một màn | Không |
| Complexity | C1 | CRUD thường | Không |

**SWP = 1 · Giờ ước tính = 4**

## Lý do

```
Scope = S1 (Một phần một màn).
  → Khớp từ khoá: một phần, một trường, một dòng, hiển thị thêm.
  → Đối chiếu ví dụ LAB-4: SCR-D4-01 vùng B-5 'Ghi chú phạm vi vai' — thêm một dòng ghi chú tĩnh trên form đã có, không đổi API-ORD-01/API-ALC-01.
Complexity = C1 (CRUD thường).
  → Khớp từ khoá: crud, validate cơ bản.
  → Đối chiếu ví dụ LAB-4: SCR-D4-01 B-0..B-3 — chọn khách hàng, chọn SKU, nhập số lượng, nhập ngày giao mong muốn: bốn trường input + validate required/min, không có rule loại trừ nào ở bước nhập.
Tra ma trận ô (S1 × C1) → SWP = 1.
Quy đổi giờ: 1 SWP × 4 giờ/SWP = 4 giờ.
```
