# Kết quả chấm SWP — Kiểm giới hạn giờ lái xe trước khi công bố tuyến (FR-SCH-02)

| Trục | Mức | Nhãn | Ghi đè thủ công? |
|---|---|---|---|
| Scope | S3 | Nhiều màn hoặc tầng kiến trúc | Không |
| Complexity | C3 | Có ràng buộc ngoài hệ thống | Không |

**SWP = 8 · Giờ ước tính = 32**

## Lý do

```
Scope = S3 (Nhiều màn hoặc tầng kiến trúc).
  → Khớp từ khoá: nhiều màn, tầng kiến trúc, thêm cột, rule_version.
  → Đối chiếu ví dụ LAB-4: FR-SCH-02 giới hạn giờ lái xe — RFP tr.34 ghi rõ route cần cột rule_version mới, luật này ràng buộc cả /routes lẫn cách khoá phiên bản tuyến, không nằm gọn trong một màn.
Complexity = C3 (Có ràng buộc ngoài hệ thống).
  → Khớp từ khoá: giờ lái xe, pháp lý, dịch vụ bản đồ, fr-sch-02, if-map-01, chưa có thiết kế.
  → Đối chiếu ví dụ LAB-4: FR-SCH-02 kiểm giới hạn giờ lái xe (trần pháp lý năm/tháng/ngày/tuần, RFP tr.34) và IF-MAP-01 nối dịch vụ bản đồ ngoài (ước lượng quá 24 giờ thì cấm công bố, RFP tr.56).
Tra ma trận ô (S3 × C3) → SWP = 8.
Quy đổi giờ: 8 SWP × 4 giờ/SWP = 32 giờ.
```
