# Kiểm giới hạn giờ lái xe trước khi công bố tuyến (FR-SCH-02)

Nhiều màn hoặc tầng kiến trúc — route cần thêm cột `rule_version` để khoá đúng bộ luật giờ lái xe
tại thời điểm công bố (RFP tr.33), ảnh hưởng cả màn `/routes` lẫn mô hình dữ liệu nền `route`.
Chưa có thiết kế nào trong LAB-2 cho việc này — phải thiết kế mới hoàn toàn.

Đây là ràng buộc ngoài hệ thống: chuỗi ngưỡng giờ lái xe là quy định pháp lý bên ngoài (năm/tháng/
ngày/tuần), không phải logic hệ thống tự quyết. Chặn công bố tuyến khi vượt trần giờ lái xe, và
phải hiện đúng khoảng giờ vi phạm (RFP tr.34, FR-SCH-02, receive hai vế).

- Nguồn: `specs/05-screen-spec/scr-d5-01-lap-tuyen-va-cong-bo.md` mục B-10, dòng 1 bảng "Chỗ còn mở".
- Liên quan: `IF-MAP-01` (dịch vụ bản đồ ngoài) cũng là ràng buộc ngoài hệ thống tương tự, nhưng
  tách issue riêng — không gộp hai mã RFP khác nhau vào một issue.
- Definition of Done: `[TBD]` — chờ Q&A No.10 (mô hình dữ liệu giờ lái xe) trả lời trước khi chốt
  chi tiết, hiện chỉ ước lượng ở mức khung việc.
