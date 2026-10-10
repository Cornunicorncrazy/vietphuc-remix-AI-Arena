const { GoogleGenAI } = require('@google/genai');

const CULTURAL_CONTEXT = `Bạn là Trợ lý Văn hóa và Chuyên gia hỏi đáp thông minh trên "Chuyến tàu Việt Phục" (Chuyến tàu Việt Nam). Bạn đồng hành cùng hành khách để chia sẻ kiến thức sâu sắc, chính xác, tự hào về cổ phục Việt Nam (Việt phục) và trang phục truyền thống của các dân tộc Việt Nam.

CƠ SỞ TRI THỨC VĂN HÓA TRÊN CHUYẾN TÀU:
1. Áo giao lĩnh (Áo cổ chéo):
   - Đặc trưng: Hai vạt áo giao nhau trước ngực (cổ chéo), dáng áo thụng hoặc vạt mềm nhiều lớp. Thường phối cùng thường (váy quây) hoặc quần dài, bên trong có yếm/trung đơn.
   - Lịch sử: Xuất hiện sớm và phổ biến qua các thời kỳ Lý, Trần, Lê sơ và Hậu Lê. Hiện vật tiêu biểu gồm áo mộ cổ quan quận công Đỗ Thế Giai (thế kỷ 18) và các tượng chùa cổ.
   - Phong cách: Duyên dáng qua từng lớp áo, mềm mại và cổ kính.

2. Áo Nhật Bình:
   - Đặc trưng: Y phục cung đình cao cấp dành cho hoàng hậu, công chúa, phi tần và mệnh phụ triều Nguyễn (1802–1945). Điểm nhận diện nổi bật nhất là cổ áo khoét hình chữ nhật lớn trước ngực, có dải ngũ sắc viền quanh tượng trưng cho ngũ hành; tay áo có viền ngũ sắc; thân áo thêu hoa văn phượng hoàng, hoa lá, cổ đồ lộng lẫy. Thường đội kèm khăn vành dây.
   - Lưu ý: Cần phân biệt lễ phục cung đình nguyên gốc với các mẫu phỏng dựng chụp ảnh ngày nay.

3. Áo ngũ thân (Ngũ thân năm thân):
   - Cấu trúc: May ghép từ 5 thân vải (2 thân trước, 2 thân sau và 1 thân con kín đáo bên trong vạt phải). Cổ đứng vuông vức cài 5 nút (khuy), biểu trưng cho "ngũ thường" (Nhân, Lễ, Nghĩa, Trí, Tín) và "ngũ luân" đạo làm người.
   - Phân loại:
     + Áo ngũ thân tay chẽn: Ống tay bó gọn gàng, thuận tiện sinh hoạt hằng ngày. Đây chính là tiền thân trực tiếp của áo dài Việt Nam hiện đại.
     + Áo ngũ thân tay thụng (Áo tấc): Ống tay rộng dài buông rủ, dùng làm lễ phục trong các dịp trọng thể, tế lễ, cưới hỏi.
   - Lịch sử: Được chúa Nguyễn Phúc Khoát định hình năm 1744 ở Đàng Trong và vua Minh Mạng chuẩn hóa thành quốc phục toàn quốc vào thế kỷ 19.

4. Áo bà ba:
   - Đặc trưng: Áo ngắn xẻ ngực cài nút chính giữa, cổ tròn hoặc tim, xẻ tà hai bên hông tạo sự thoáng mát, có hai túi vuông phía trước vạt dưới.
   - Không gian văn hóa: Biểu tượng bình dị, thuần hậu, phóng khoáng của người dân vùng đồng bằng sông Cửu Long (Nam Bộ), gắn liền với đời sống sông nước và chiếc khăn rằn.

5. Trang phục dân tộc H'Mông:
   - Nổi bật với váy xòe xếp nếp (hàng trăm nếp gấp tỉ mỉ bằng vải lanh) bung xòe tròn như đóa hoa khi bước đi.
   - Kỹ thuật thủ công trứ danh: Vẽ hoa văn bằng sáp ong (in sáp ong batik) trên vải lanh nhuộm chàm, thêu chỉ màu sặc sỡ và ghép vải tinh xảo hình hoa văn quả trám, kỷ hà, xoắn ốc. Đi kèm xà cạp, yếm trước và khăn đội đầu.
   - Mỗi nhóm H'Mông (Hmông Hoa, Hmông Đen, Hmông Trắng, Hmông Đỏ) có nét riêng độc đáo.

6. Trang phục dân tộc Dao đỏ:
   - Điểm nhấn chủ đạo là sắc đỏ rực rỡ tượng trưng cho sự may mắn, ấm no và xua đuổi tà ma.
   - Phụ nữ Dao đỏ đội khăn hoặc mũ đỏ lớn đính chùm hoa len đỏ, cổ áo và ngực áo đính quả bông đỏ và hạt cườm; áo chàm dài thêu công phu hoa văn cây thông, hình người, dấu chân hổ, quả trám mang ý nghĩa nhân sinh và vũ trụ quan.

7. Trang phục dân tộc Thái (Thái Đen & Thái Trắng):
   - Áo cóm ngắn ôm sát tôn dáng người phụ nữ, điểm nhấn then chốt là hàng khuy bạc chạm khắc hình bướm, nhện (xằng piêu) biểu trưng cho sự sinh sôi và gắn kết âm dương.
   - Mặc cùng váy dài chạm gót bằng vải nhuộm chàm đen, thắt dải lụa xanh (xài eo). Người Thái Đen có chiếc khăn piêu thêu họa tiết cút piêu tinh tế che chở và làm duyên.

8. Trang phục dân tộc Ê Đê:
   - Văn hóa mẫu hệ Tây Nguyên: Nữ mặc áo klan (áo chui đầu xẻ ngang bờ vai) và váy quấn myeng dài chấm gót.
   - Nền vải màu chàm sẫm hoặc đen dệt sợi bông thủ công; các dải hoa văn thổ cẩm đỏ, vàng, trắng chạy ngang thân áo và gấu váy mô phỏng hình rồng gai, rùa, kỳ đà, chim muông đặc trưng của núi rừng đại ngàn.

9. Lịch sử y phục qua các thời đại:
   - Đông Sơn: Dấu tích hoa văn người mặc váy lông chim trên trống đồng Ngọc Lũ, mảnh vải dệt mộ cổ Châu Can.
   - Lý – Trần – Lê: Hệ thống áo mũ cung đình tôn nghiêm bên cạnh trang phục dân gian (giao lĩnh, tứ thân, yếm, váy).
   - Phong trào cách tân áo dài (thập niên 1930): Họa sĩ Cát Tường sáng tạo áo dài Le Mur (Âu hóa với cổ bẻ, tay bồng), sau đó họa sĩ Lê Phổ dung hòa đường nét truyền thống tạo nên phom dáng áo dài thanh thoát ngày nay.

10. Hành trình 10 toa tàu:
   - Toa 01: Toa hành khách 01 (Khám phá phong cách trang phục qua bài trắc nghiệm 9 câu hỏi).
   - Toa 02: Toa Hoa Phượng Đỏ (Photobooth ghép ảnh cùng các kiểu Việt phục).
   - Toa 03: Toa bưu điện (Gửi thư lưu niệm và dán tem di sản).
   - Toa 04: Toa tranh Tết (Bàn hỏi đáp trang phục và nghệ thuật tranh dân gian).
   - Toa 05: Toa chở hàng (Ratracô).
   - Toa 06: Toa Hành trình Di sản (Triển lãm di sản cổ phục).
   - Toa 07: Toa Hà Nội hai tầng (The Hanoi Train, Ô Quan Chưởng).
   - Toa 08: Toa SJourney (Toa du lịch sang trọng hoài cổ).
   - Toa 09: Toa cổ Đà Lạt (Đường sắt răng cưa Tháp Chàm - Đà Lạt, toa gỗ 4109).
   - Toa 10: Đầu máy D19E Đổi Mới kéo đoàn tàu.

HƯỚNG DẪN TRẢ LỜI CỦA TRỢ LÝ:
- Trả lời bằng ngôn ngữ người dùng yêu cầu (mặc định là Tiếng Việt).
- Giọng văn trang trọng, truyền cảm, tự hào văn hóa dân tộc nhưng vẫn gần gũi, súc tích (khoảng 2–4 đoạn văn ngắn).
- Phân biệt rành mạch giữa một trang phục cụ thể với toàn bộ y phục của cộng đồng; không quy kết một địa phương đại diện cho toàn bộ dân tộc.
- Nêu rõ các chi tiết cấu trúc, hoa văn, kỹ thuật dệt nhuộm và dịp mặc.`;

const LOCAL_KNOWLEDGE = [
  {
    keywords: ['hmong', 'h mong', 'mong', 'sáp ong', 'xếp nếp', 'váy h’mông', 'lanh'],
    title: 'Trang phục và váy phụ nữ H’Mông',
    answer: 'Váy phụ nữ H’Mông nổi bật với cấu trúc xếp nếp xòe tròn bồng bềnh, tạo nhịp điệu uyển chuyển khi bước đi. Điểm độc đáo nhất là nghệ thuật vẽ sáp ong (batik) trên vải lanh nhuộm chàm, kết hợp với thêu chỉ màu và ghép vải thủ công tinh xảo với các họa tiết quả trám, hình kỷ hà. Mỗi nhóm H’Mông (Hmông Hoa, Hmông Đen, Hmông Trắng) đều có cách phối màu và hoa văn riêng biệt.',
    sources: [{ title: 'Bảo tàng Dân tộc học — Váy phụ nữ Hmông Hoa', url: 'https://vme.vass.gov.vn/thong-tin-hien-vat/vay-cua-phu-nu-hmong-hoa-557309' }]
  },
  {
    keywords: ['dao do', 'dao đỏ', 'người dao', 'khăn đỏ'],
    title: 'Trang phục phụ nữ Dao đỏ',
    answer: 'Trang phục Dao đỏ gây ấn tượng mạnh mẽ với sắc đỏ chủ đạo tượng trưng cho may mắn, thịnh vượng và hạnh phúc. Phụ nữ Dao đỏ nổi tiếng với chiếc khăn đội đầu màu đỏ kết hoa len đỏ rực rỡ, áo dài chàm thêu hoa văn kín đáo ở viền cổ, tà áo và lưng áo với các họa tiết cây thông, dấu chân hổ, quả trám mang ý nghĩa vũ trụ quan sâu sắc.',
    sources: [{ title: 'Bảo tàng Dân tộc học — Người Dao', url: 'https://vme.vass.gov.vn/nguoi-dao/nguoi-dao-557494' }]
  },
  {
    keywords: ['thái', 'thai', 'áo cóm', 'ao com', 'khăn piêu', 'khan pieu', 'khuy bướm'],
    title: 'Áo cóm và khăn piêu người Thái',
    answer: 'Trang phục nữ dân tộc Thái gồm áo cóm ngắn bó sát người tôn dáng thon gọn, đi cùng hàng khuy bạc hình bướm (xằng piêu) tượng trưng cho sự gắn kết âm dương. Áo cóm phối cùng váy dài đen chạm gót và thắt lưng xanh (xài eo). Phụ nữ Thái Đen còn có chiếc khăn piêu thêu công phu ở hai đầu khăn với các họa tiết cút piêu mang ý nghĩa che chở, bảo vệ.',
    sources: [{ title: 'Bảo tàng Dân tộc học — Người Thái', url: 'https://vme.vass.gov.vn/nguoi-thai/nguoi-thai-557472' }]
  },
  {
    keywords: ['ê đê', 'e de', 'ede', 'thổ cẩm ê đê', 'klan', 'myeng'],
    title: 'Trang phục truyền thống dân tộc Ê Đê',
    answer: 'Trang phục nữ dân tộc Ê Đê phản ánh nét đẹp kiên cường của chế độ mẫu hệ Tây Nguyên. Bộ trang phục gồm áo klan (áo chui đầu xẻ ngang vai) và váy quấn myeng dài chạm mắt cá chân trên nền vải đen hoặc chàm sẫm dệt sợi bông thủ công. Các dải hoa văn thổ cẩm đỏ, vàng, trắng chạy ngang thân áo và gấu váy mô phỏng hình rồng gai, rùa, chim muông của đại ngàn.',
    sources: [{ title: 'Bảo tàng Đắk Lắk — Nghề dệt truyền thống Ê Đê', url: 'https://daklakmuseum.vn/tin-tuc-su-kien/bai-viet/bao-ton-va-phat-huy-nghe-det-truyen-thong--cua-nguoi-ede-tai-bao-tang-dak-lak---thuc-trang-va-giai-phap?lng=en' }]
  },
  {
    keywords: ['ngũ thân', 'ngu than', 'áo tấc', 'ao tac', 'tay chẽn', 'năm thân'],
    title: 'Áo ngũ thân truyền thống',
    answer: 'Áo ngũ thân là kiểu áo cổ đứng cài 5 nút khuy, gồm 5 thân vải tượng trưng cho đạo lý "ngũ thường" (Nhân, Lễ, Nghĩa, Trí, Tín) và "ngũ luân". Áo có hai dạng chính: tay chẽn (ống tay bó gọn gàng, thuận tiện thường nhật và là tiền thân trực tiếp của áo dài ngày nay) và tay thụng (áo tấc, ống tay rộng dùng trong nghi lễ trọng thể). Áo được định hình dưới thời chúa Nguyễn Phúc Khoát và chuẩn hóa dưới thời vua Minh Mạng.',
    sources: [{ title: 'Bảo tàng Lịch sử Quốc gia — Áo ngũ thân', url: 'https://baotanglichsu.vn/vi/Articles/3090/72685/bao-tang-lich-su-quoc-gia-tiep-nhan-ao-dai-ngu-than-truyen-thong.html' }]
  },
  {
    keywords: ['nhật bình', 'nhat binh', 'cung đình', 'khăn vành'],
    title: 'Áo Nhật Bình triều Nguyễn',
    answer: 'Áo Nhật Bình là lễ phục cung đình cao cấp dành cho hoàng hậu, công chúa, phi tần và mệnh phụ triều Nguyễn. Tên gọi bắt nguồn từ phần cổ áo hình chữ nhật lớn trước ngực, hai bên có dải ngũ sắc buông dài tượng trưng cho ngũ hành; thân áo thêu hoa văn phượng hoàng, cổ đồ tinh xảo. Áo thường được đội cùng khăn vành dây trong các dịp đại lễ.',
    sources: [{ title: 'Bảo tàng Lịch sử Quốc gia — Y phục thời Nguyễn', url: 'https://baotanglichsu.vn/vi/Articles/3096/18741/y-phuc-thoi-nguyen-tai-bao-tang-lich-su-quoc-gia.html' }]
  },
  {
    keywords: ['giao lĩnh', 'giao linh', 'cổ chéo'],
    title: 'Áo giao lĩnh (Áo cổ chéo)',
    answer: 'Áo giao lĩnh là dáng áo có hai vạt đan chéo giao nhau trước ngực, dáng áo mềm mại, phổ biến trong nhiều thế kỷ từ thời Lý, Trần đến Lê sơ và Hậu Lê. Áo thường được mặc phối nhiều lớp cùng thường (váy quây) hoặc quần dài, tạo nên vẻ đẹp thanh nhã, thâm trầm của y phục cổ truyền.',
    sources: [{ title: 'Bảo tàng Lịch sử Quốc gia — Ngàn năm áo mũ', url: 'https://baotanglichsu.vn/vi/Articles/2006/67015/ngan-nam-ao-mu.html' }]
  },
  {
    keywords: ['bà ba', 'ba ba', 'nam bộ'],
    title: 'Áo bà ba Nam Bộ',
    answer: 'Áo bà ba là kiểu áo ngắn cài nút giữa xẻ tà hai bên hông đặc trưng của người dân Nam Bộ. Với cấu trúc đơn giản, chất liệu mát nhẹ và hai túi vuông tiện lợi phía trước, áo bà ba phản ánh cốt cách phóng khoáng, mộc mạc và chân thành của con người vùng sông nước phương Nam.',
    sources: [{ title: 'Cục Du lịch Quốc gia — Làng nghề dệt khăn choàng', url: 'https://nongthon.vietnamtourism.gov.vn/lang-nghe-det-khan-choang-dong-thap-giu-hon-van-hoa-mo-loi-du-lich/' }]
  },
  {
    keywords: ['khác nhau', 'áo dài', 'ao dai', 'so sánh', 'hiện đại'],
    title: 'Sự khác biệt giữa Áo ngũ thân và Áo dài hiện đại',
    answer: 'Áo ngũ thân may từ 5 thân vải, phom suông rộng rãi không chiết eo, cài 5 khuy bên phải. Trong khi đó, áo dài hiện đại ra đời sau các cuộc cải biến thập niên 1930 (như áo Le Mur và áo dài Lê Phổ), với phom ôm sát cơ thể, chỉ còn 2 tà (trước và sau) và nhấn mạnh đường cong người mặc. Áo ngũ thân tay chẽn chính là cội nguồn của áo dài hiện đại.',
    sources: [{ title: 'Sở VHTT Thừa Thiên Huế — Áo dài qua các thời kỳ', url: 'https://svhttdl.hue.gov.vn/tin-trong-nuoc/ao-dai-viet-nam-qua-cac-thoi-ky-lich-su-mot-trien-lam-khong-the-bo-qua.html' }]
  }
];

function normalizeText(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/đ/g, 'd').replace(/[^a-z0-9\s]/g, ' ').trim();
}

function findLocalAnswer(question, language) {
  const normQ = normalizeText(question);
  for (const item of LOCAL_KNOWLEDGE) {
    if (item.keywords.some(kw => normQ.includes(normalizeText(kw)))) {
      return { answer: item.answer, sources: item.sources };
    }
  }
  return {
    answer: language === 'en'
      ? 'Welcome to the Việt Phục cultural journey! You can ask about traditional garments featured on our train: Áo giao lĩnh, Áo Nhật Bình, Áo ngũ thân, Áo bà ba, and ethnic clothing of the H’Mông, Dao đỏ, Thái, and Ê Đê communities.'
      : 'Chào bạn! Bàn hỏi đáp trên Chuyến tàu Việt Phục sẵn sàng chia sẻ về các dáng áo cổ truyền: Áo giao lĩnh, Áo Nhật Bình, Áo ngũ thân, Áo bà ba, cùng trang phục độc đáo của đồng bào H’Mông, Dao đỏ, Thái và Ê Đê. Hãy chọn câu hỏi gợi ý hoặc đặt câu hỏi cụ thể về từng dáng áo bạn quan tâm nhé!',
    sources: [
      { title: 'Bảo tàng Lịch sử Quốc gia', url: 'https://baotanglichsu.vn' },
      { title: 'Bảo tàng Dân tộc học Việt Nam', url: 'https://vme.vass.gov.vn' }
    ]
  };
}

async function answer(messages, language, key) {
  if (!Array.isArray(messages) || !messages.length) throw new TypeError('Invalid messages');
  const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
  const question = lastUserMessage?.content || '';

  const apiKey = key || process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const contents = messages.slice(-8).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content.trim() }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: `${CULTURAL_CONTEXT}\n\nHãy trả lời bằng ${language === 'en' ? 'tiếng Anh (English)' : 'tiếng Việt'}.`,
          temperature: 0.3,
        }
      });

      const text = response.text ? response.text.trim() : '';
      if (text) {
        // Extract references if applicable or provide standard museum citations
        const matched = LOCAL_KNOWLEDGE.find(item => item.keywords.some(kw => normalizeText(question).includes(normalizeText(kw))));
        return {
          answer: text.slice(0, 4000),
          sources: matched ? matched.sources : [
            { title: 'Bảo tàng Lịch sử Quốc gia', url: 'https://baotanglichsu.vn/vi/Articles/2006/67015/ngan-nam-ao-mu.html' },
            { title: 'Bảo tàng Dân tộc học Việt Nam', url: 'https://vme.vass.gov.vn' }
          ]
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local curated knowledge:', err.message);
    }
  }

  // Fallback to rich curated local knowledge base
  return findLocalAnswer(question, language);
}

module.exports = { answer };
