(() => {
  const facts = {
    'giao-linh': ['Áo có hai vạt giao nhau trước ngực, thường được gọi là áo cổ chéo. Cách phục dựng thay đổi theo thời kỳ và tư liệu. Gợi ý cho bạn thích phom mềm và phối nhiều lớp.', 'Bảo tàng Lịch sử Quốc gia — Ngàn năm áo mũ', 'https://baotanglichsu.vn/vi/Articles/2006/67015/ngan-nam-ao-mu.html'],
    'nhat-binh': ['Một dạng y phục cung đình nữ triều Nguyễn, có mảng cổ hình chữ nhật, tay rộng và hoa văn trang trí. Phục dựng hiện nay cần phân biệt với lễ phục nguyên gốc. Gợi ý cho gu trang trọng, yêu màu sắc và chi tiết.', 'Tạp chí Văn hóa Nghệ thuật — Hiện vật áo Nhật Bình', 'https://vanhoanghethuat.vn/hoa-van-trang-tri-tren-ao-nhat-binh-cua-doan-huy-hoang-thai-hau-trieu-nguyen-1802-1945-77758106.html'],
    'ngu-than': ['Áo năm thân, cổ đứng, gắn với lịch sử y phục thời Nguyễn. Có kiểu tay chẽn gọn và tay thụng (áo tấc) rộng. Gợi ý cho bạn yêu đường nét cổ điển, chỉn chu và muốn tìm hiểu cấu trúc áo.', 'Sở Văn hóa và Thể thao Huế — Áo dài qua các thời kỳ', 'https://svhttdl.hue.gov.vn/tin-trong-nuoc/ao-dai-viet-nam-qua-cac-thoi-ky-lich-su-mot-trien-lam-khong-the-bo-qua.html'],
    'ba-ba': ['Áo ngắn cài phía trước, thường phối quần dài, quen thuộc trong sinh hoạt Nam Bộ. Có mẫu thường nhật và mẫu dành cho dịp đặc biệt. Gợi ý cho bạn ưu tiên sự thoải mái, gần gũi và cách phối giản dị.', 'Cục Du lịch Quốc gia — Đời sống và làng nghề Đồng Tháp', 'https://nongthon.vietnamtourism.gov.vn/lang-nghe-det-khan-choang-dong-thap-giu-hon-van-hoa-mo-loi-du-lich/'],
    'hmong': ['Váy xếp nếp có nhiều biến thể theo nhóm và địa phương. Hiện vật váy Hmông Hoa ở Mù Cang Chải kết hợp vải lanh nhuộm chàm, in sáp ong, thêu và ghép vải. Gợi ý cho bạn yêu nhịp nếp váy và hoa văn phong phú; không đại diện mọi nhóm H’Mông.', 'Bảo tàng Dân tộc học — Váy phụ nữ Hmông Hoa', 'https://vme.vass.gov.vn/thong-tin-hien-vat/vay-cua-phu-nu-hmong-hoa-557309'],
    'dao-do': ['Khám phá điểm nhấn đỏ, đường viền, nghệ thuật thêu và khăn hoặc mũ đội đầu trong trang phục Dao đỏ. Kiểu mặc và phụ kiện thay đổi theo địa phương, khác các nhóm Dao khác. Gợi ý cho bạn yêu điểm nhấn rõ và chi tiết thủ công.', 'Bảo tàng Dân tộc học — Người Dao', 'https://vme.vass.gov.vn/nguoi-dao/nguoi-dao-557494'],
    'thai': ['Áo cóm gọn thân trên, thường phối váy dài; khăn piêu là một phụ trang đáng tìm hiểu. Thái Đen, Thái Trắng và các nhóm địa phương có nhiều khác biệt. Gợi ý cho bạn thích bố cục cân đối và chi tiết nhỏ tinh tế.', 'Bảo tàng Dân tộc học — Người Thái', 'https://vme.vass.gov.vn/nguoi-thai/nguoi-thai-557472'],
    'ede': ['Nữ phục thường gồm áo và váy quấn, với các dải hoa văn trên nền vải tối. Nghề dệt còn tạo khố, áo và mền; đồ thường nhật và nghi lễ có khác biệt. Gợi ý cho bạn thích nền màu sâu, hoa văn có nhịp điệu và câu chuyện nghề dệt.', 'Bảo tàng Đắk Lắk — Nghề dệt truyền thống Ê Đê', 'https://daklakmuseum.vn/tin-tuc-su-kien/bai-viet/bao-ton-va-phat-huy-nghe-det-truyen-thong--cua-nguoi-ede-tai-bao-tang-dak-lak---thuc-trang-va-giai-phap?lng=en']
  };
  window.clothingQuizData.categories.forEach(category => {
    const [description,title,url] = facts[category.id];
    category.description = description;
    category.sources = [{title,url}];
  });
})();
