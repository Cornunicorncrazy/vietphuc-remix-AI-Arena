/* Preference-based styling quiz. Cultural descriptions may be expanded with verified sources. */
window.clothingQuizData = {
  version: 2,
  intro: 'Chọn điều bạn thích nhất để tìm một phong cách trang phục gợi ý cho mình. Đây là trò chơi khám phá gu thẩm mỹ, không phải đánh giá tính cách hay bản sắc của một cộng đồng.',
  categories: [
    { id: 'giao-linh', name: 'Áo giao lĩnh', tagline: 'Duyên dáng qua từng lớp áo', description: 'Gợi ý dành cho người thích cổ áo giao nhau, nhiều lớp và dáng áo mềm. Hãy khám phá cách phối Việt phục phù hợp với dịp mặc và sở thích của bạn.', traits: ['Thích nhiều lớp', 'Dáng áo mềm', 'Chi tiết cổ áo'] },
    { id: 'nhat-binh', name: 'Áo Nhật Bình', tagline: 'Một điểm nhấn trang trọng', description: 'Gợi ý dành cho người yêu những mảng màu rõ nét, phần cổ và viền áo nổi bật cùng cách phối có chủ đích. Bạn có thể tìm hiểu thêm bối cảnh của trang phục trước khi lựa chọn.', traits: ['Trang trọng', 'Viền áo nổi bật', 'Phối màu có điểm nhấn'] },
    { id: 'ngu-than', name: 'Áo ngũ thân', tagline: 'Thanh nhã trong đường nét', description: 'Gợi ý dành cho người thích phom áo thon dài, đường nét gọn và bảng màu tiết chế. Dáng áo và phụ kiện có thể thay đổi theo kiểu phục dựng hoặc cách phối hiện nay.', traits: ['Đường nét gọn', 'Màu sắc tiết chế', 'Phom áo thon dài'] },
    { id: 'ba-ba', name: 'Áo bà ba', tagline: 'Thoải mái và gần gũi', description: 'Gợi ý dành cho người ưu tiên sự thoải mái, dáng áo gọn và cách phối đơn giản. Bạn có thể bắt đầu từ chất liệu dễ mặc, màu sắc mình thích và phụ kiện vừa đủ.', traits: ['Thoải mái', 'Phối đơn giản', 'Dáng áo gọn'] },
    { id: 'hmong', name: "Váy H’mông", tagline: 'Màu sắc và nhịp xếp nếp', description: 'Gợi ý dành cho người thích váy xếp nếp, họa tiết dày và sắc màu tương phản. Trang phục H’mông rất đa dạng theo cộng đồng và địa phương; hãy tìm hiểu đúng mẫu bạn chọn.', traits: ['Xếp nếp', 'Họa tiết phong phú', 'Màu tương phản'] },
    { id: 'dao-do', name: 'Trang phục Dao đỏ', tagline: 'Sắc đỏ làm điểm nhấn', description: 'Gợi ý dành cho người thích nền màu tối kết hợp điểm nhấn đỏ và những chi tiết trang trí nổi bật. Mỗi mẫu có cách mặc, ý nghĩa và biến thể riêng cần được tìm hiểu trong bối cảnh của cộng đồng.', traits: ['Điểm nhấn đỏ', 'Chi tiết nổi bật', 'Phụ kiện đồng bộ'] },
    { id: 'thai', name: 'Trang phục dân tộc Thái', tagline: 'Gọn gàng và hài hòa', description: 'Gợi ý dành cho người thích dáng áo gọn, chân váy dài và cách phối cân đối. Trang phục của các cộng đồng Thái có nhiều biến thể; đây là một hướng khám phá thẩm mỹ để bạn tìm hiểu thêm.', traits: ['Dáng áo gọn', 'Chân váy dài', 'Phối hài hòa'] },
    { id: 'ede', name: 'Trang phục dân tộc Ê Đê', tagline: 'Nhịp họa tiết trên nền trầm', description: 'Gợi ý dành cho người thích nền vải sẫm, các dải họa tiết hình học và vẻ đẹp của chất liệu dệt. Hãy tìm hiểu nguồn gốc, cách mặc và ý nghĩa của mẫu trang phục cụ thể.', traits: ['Nền màu trầm', 'Dải họa tiết', 'Chất liệu dệt'] }
  ],
  questions: [
    { id: 'q1', quick: true, prompt: 'Một bộ trang phục khiến bạn muốn thử ngay thường có nét gì?', answers: [
      { label: 'Dáng áo mềm, dài và có chuyển động', weights: { 'giao-linh': 2, 'ngu-than': 2 } },
      { label: 'Phom rõ ràng, chỉn chu và trang trọng', weights: { 'nhat-binh': 2, 'ngu-than': 2 } },
      { label: 'Màu và chi tiết tạo ấn tượng ngay', weights: { hmong: 2, 'dao-do': 2 } },
      { label: 'Gọn, dễ mặc, với chất liệu có nét riêng', weights: { 'ba-ba': 2, thai: 2, ede: 2 } }
    ] },
    { id: 'q2', quick: true, prompt: 'Bạn thích cách trang phục nằm trên cơ thể như thế nào?', answers: [
      { label: 'Rộng và có nhiều lớp để phối', weights: { 'giao-linh': 2, 'nhat-binh': 2 } },
      { label: 'Dáng dài, đường nét liền mạch', weights: { 'ngu-than': 2, 'nhat-binh': 2 } },
      { label: 'Thoải mái, không cần quá nhiều phụ kiện', weights: { 'ba-ba': 2, ede: 2 } },
      { label: 'Phần thân gọn, phần dưới và chi tiết nổi bật', weights: { hmong: 2, 'dao-do': 2, thai: 2 } }
    ] },
    { id: 'q3', quick: true, prompt: 'Nếu tự chọn một bảng màu, bạn nghiêng về nhóm nào?', answers: [
      { label: 'Màu trầm hoặc trung tính, ít tương phản', weights: { 'ngu-than': 2, 'ba-ba': 2 } },
      { label: 'Màu sáng nhẹ, dịu và hài hòa', weights: { 'giao-linh': 2, thai: 2 } },
      { label: 'Màu sâu, phối từng mảng hoặc từng lớp', weights: { 'nhat-binh': 2, 'giao-linh': 2 } },
      { label: 'Nền tối đi cùng những sắc màu nổi bật', weights: { hmong: 2, 'dao-do': 2, ede: 2 } }
    ] },
    { id: 'q4', quick: true, prompt: 'Khi nhìn gần một bộ trang phục, chi tiết nào giữ mắt bạn lâu nhất?', answers: [
      { label: 'Nhịp họa tiết hình học và bề mặt vải', weights: { hmong: 2, ede: 2 } },
      { label: 'Viền, cổ áo và phần trang trí nổi bật', weights: { 'dao-do': 2, 'nhat-binh': 2 } },
      { label: 'Đường may gọn, chi tiết vừa đủ', weights: { 'ba-ba': 2, 'ngu-than': 2 } },
      { label: 'Độ mềm của vải và đường nét duyên dáng', weights: { 'ngu-than': 2, thai: 2, 'giao-linh': 2 } }
    ] },
    { id: 'q5', quick: true, prompt: 'Bạn muốn bộ trang phục trong buổi chụp ảnh của mình mang cảm giác nào?', answers: [
      { label: 'Nhẹ nhàng, có những tà áo chuyển động', weights: { 'giao-linh': 2, 'nhat-binh': 2 } },
      { label: 'Rực rỡ và giàu chi tiết để ngắm', weights: { 'nhat-binh': 2, hmong: 2 } },
      { label: 'Thanh nhã, cân đối, ít chi tiết thừa', weights: { 'ngu-than': 2, thai: 2 } },
      { label: 'Có nét riêng từ màu vải và điểm nhấn', weights: { 'ba-ba': 2, 'dao-do': 2, ede: 2 } }
    ] },
    { id: 'q6', prompt: 'Nếu chỉ giữ một điểm nhấn cho bộ đồ, bạn sẽ giữ gì?', answers: [
      { label: 'Một mảng đỏ hoặc phần viền bắt mắt', weights: { 'dao-do': 2, 'nhat-binh': 2 } },
      { label: 'Nếp áo, nếp váy hoặc cách xếp lớp', weights: { hmong: 2, 'giao-linh': 2 } },
      { label: 'Dáng áo thon dài và đường nét thanh thoát', weights: { 'giao-linh': 2, 'ngu-than': 2 } },
      { label: 'Chất liệu và sự cân đối của cả bộ', weights: { 'ba-ba': 2, thai: 2, ede: 2 } }
    ] },
    { id: 'q7', prompt: 'Bạn thấy mình hợp với cách dùng phụ kiện nào nhất?', answers: [
      { label: 'Một món đội đầu tạo điểm nhấn rõ ràng', weights: { 'nhat-binh': 2, 'dao-do': 2 } },
      { label: 'Thật ít phụ kiện, để trang phục tự nổi bật', weights: { 'ba-ba': 2, 'ngu-than': 2 } },
      { label: 'Phụ kiện gọn, đồng bộ với dáng áo', weights: { thai: 2, 'ngu-than': 2 } },
      { label: 'Phụ kiện vải hoặc dệt, nhiều lớp chi tiết', weights: { hmong: 2, ede: 2, 'giao-linh': 2 } }
    ] },
    { id: 'q8', prompt: 'Trong một buổi đi dạo hoặc sự kiện, bạn muốn cảm nhận điều gì khi mặc?', answers: [
      { label: 'Các lớp áo mềm chuyển động quanh mình', weights: { 'giao-linh': 2, 'nhat-binh': 2 } },
      { label: 'Tà áo chuyển động theo từng bước chân', weights: { 'giao-linh': 2, 'ngu-than': 2 } },
      { label: 'Dáng đồ gọn, dễ di chuyển và phối', weights: { 'ba-ba': 2, thai: 2 } },
      { label: 'Họa tiết và màu sắc khiến bộ đồ có dấu ấn', weights: { hmong: 2, 'dao-do': 2, ede: 2 } }
    ] },
    { id: 'q9', prompt: 'Bạn muốn dành thời gian tìm hiểu thêm kiểu trang phục nào?', answers: [
      { label: 'Cách phối cổ áo và nhiều lớp Việt phục', weights: { 'giao-linh': 2, 'ngu-than': 2 } },
      { label: 'Những bộ có bảng màu và phụ kiện nổi bật', weights: { 'nhat-binh': 2, 'dao-do': 2, hmong: 2 } },
      { label: 'Cách phối dáng dài, gọn và hài hòa', weights: { 'ngu-than': 2, thai: 2 } },
      { label: 'Chất liệu, cách dệt và những bộ dễ mặc', weights: { 'ba-ba': 2, ede: 2 } }
    ] },
    { id: 'q10', prompt: 'Bạn muốn phần cổ và thân áo tạo ấn tượng ra sao?', answers: [
      { label: 'Cổ áo giao nhau, các lớp vải mềm', weights: { 'giao-linh': 3, 'ngu-than': 1 } },
      { label: 'Viền cổ rõ nét, họa tiết trang trọng', weights: { 'nhat-binh': 3, 'dao-do': 1 } },
      { label: 'Cổ gọn, thân áo thon dài', weights: { 'ngu-than': 3, 'ba-ba': 1 } },
      { label: 'Chi tiết dệt hoặc thêu trên thân áo', weights: { ede: 3, hmong: 2, thai: 1 } }
    ] },
    { id: 'q11', prompt: 'Dáng phần dưới nào khiến bạn muốn ngắm lâu hơn?', answers: [
      { label: 'Váy xếp nếp với nhiều dải màu', weights: { hmong: 3, 'dao-do': 1 } },
      { label: 'Chân váy dài, gọn và cân đối', weights: { thai: 3, ede: 1 } },
      { label: 'Tà áo dài buông mềm thành nhiều lớp', weights: { 'giao-linh': 3, 'nhat-binh': 2 } },
      { label: 'Quần và áo gọn, dễ di chuyển', weights: { 'ba-ba': 3, 'ngu-than': 1 } }
    ] },
    { id: 'q12', prompt: 'Bạn thích bề mặt vải và họa tiết theo hướng nào?', answers: [
      { label: 'Vải trơn hoặc hoa văn rất tiết chế', weights: { 'ngu-than': 3, 'ba-ba': 2 } },
      { label: 'Những dải hoa văn dệt hình học', weights: { ede: 3, thai: 1 } },
      { label: 'Thêu dày, màu đối lập và phụ kiện', weights: { 'dao-do': 3, hmong: 2 } },
      { label: 'Hoa văn ở viền áo, phối màu nhiều lớp', weights: { 'nhat-binh': 3, 'giao-linh': 1 } }
    ] },
    { id: 'q13', prompt: 'Nếu chọn một món để mặc trong chuyến đi, bạn ưu tiên điều gì?', answers: [
      { label: 'Dễ vận động và gần gũi hằng ngày', weights: { 'ba-ba': 3, thai: 1 } },
      { label: 'Tìm hiểu kỹ kỹ thuật dệt và cộng đồng làm ra nó', weights: { ede: 3, hmong: 2, 'dao-do': 1 } },
      { label: 'Một phom cổ điển thanh nhã', weights: { 'ngu-than': 3, 'giao-linh': 2 } },
      { label: 'Một bộ có nghi thức và phụ kiện nổi bật', weights: { 'nhat-binh': 3, 'dao-do': 1 } }
    ] }
  ],
  scoring: {
    method: 'weighted-preference',
    quickQuestionCount: 5,
    detailQuestionCount: 13,
    answerBreadthNormalization: 'square-root',
    alternativesWithinTopRatio: .22,
    resultDisclaimer: 'Kết quả phản ánh lựa chọn thẩm mỹ trong trò chơi. Không có trang phục nào quy định tính cách của người mặc; các trang phục dân tộc cần được tìm hiểu trong bối cảnh của cộng đồng.'
  }
};
