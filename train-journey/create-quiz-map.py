from PIL import Image, ImageDraw, ImageFont
import json, textwrap
from pathlib import Path
base = Path(__file__).parent
data = json.loads((base / 'quiz-logic-data.json').read_text(encoding='utf-8'))
im = Image.new('RGB', (1900, 2860), '#f3efe3')
d = ImageDraw.Draw(im)
def font(n): return ImageFont.truetype('C:/Windows/Fonts/arial.ttf', n)
ink, green, rust = '#253c35', '#dbe5dc', '#986441'
def txt(x,y,s,n=24,color=ink): d.text((x,y),s,font=font(n),fill=color)
def box(x,y,w,h,s,fill=green):
    d.rounded_rectangle((x,y,x+w,y+h),radius=14,fill=fill,outline=ink,width=2)
    for j,line in enumerate(s.split('\n')): txt(x+18,y+14+j*30,line,23)
def arrow(x1,y1,x2,y2,label=''):
    d.line((x1,y1,x2,y2),fill=ink,width=3)
    if y2>y1:d.polygon([(x2,y2),(x2-8,y2-14),(x2+8,y2-14)],fill=ink)
    else:d.polygon([(x2,y2),(x2-14,y2-8),(x2-14,y2+8)],fill=ink)
    if label:txt((x1+x2)/2-24,(y1+y2)/2-30,label,18,rust)
txt(60,38,'BẢN ĐỒ LOGIC • KHÁM PHÁ VIỆT PHỤC',42)
txt(60,98,'Tài liệu riêng — không đưa lên website. TRUE / FALSE là điều kiện, không phải đáp án đúng / sai.',24)
box(60,158,530,76,'Bắt đầu: completed = FALSE; khóa toa 02–10')
arrow(590,196,680,196)
box(680,158,460,76,'Bấm toa 01 → mở bài khám phá')
arrow(1140,196,1230,196)
box(1230,158,605,76,'Khởi tạo điểm S[c] = 0; trả lời Q1–Q9')
box(60,282,850,110,'Đã chọn đúng một đáp án cho câu hiện tại?\nFALSE → giữ câu hiện tại; nút tiếp tục bị khóa', '#eadbc8')
arrow(910,337,1010,337,'TRUE')
box(1010,282,825,110,'Lưu lựa chọn; được quay lại sửa đáp án.\nĐóng / Escape chưa hoàn tất → vẫn khóa các toa.')
box(60,430,850,110,'Đã trả lời đủ cả 9 câu?\nFALSE → chuyển đến câu chưa trả lời tiếp theo','#eadbc8')
arrow(910,485,1010,485,'TRUE')
box(1010,430,825,110,'Tính lại S[c] từ toàn bộ lựa chọn hiện tại.\nKhông cộng lặp điểm khi quay lại hoặc đổi đáp án.')
txt(60,580,'ĐIỀU KIỆN CHẤM ĐIỂM CHO MỖI CÂU',30)
txt(60,628,'Chọn A/B/C/D = TRUE → cộng +2 vào những phong cách trong ô tương ứng.',24)
txt(60,662,'Lựa chọn không được chọn = FALSE → +0. Mỗi phong cách xuất hiện đúng một lần trong mỗi câu.',24)
names={c['id']:c['name'] for c in data['categories']}
short={'giao-linh':'Giao lĩnh','nhat-binh':'Nhật Bình','ngu-than':'Ngũ thân','ao-dai':'Áo dài','ba-ba':'Bà ba','hmong':'H’mông','dao-do':'Dao đỏ','thai':'Thái','ede':'Ê Đê'}
y=720
for i,q in enumerate(data['questions']):
    txt(60,y,f"Q{i+1}. {q['prompt']}",25)
    for j,a in enumerate(q['answers']):
        x=60+j*449
        lines=textwrap.wrap(a['label'],width=30)
        score=', '.join(short[c] for c in a['weights'])
        box(x,y+45,425,131,chr(65+j)+'. '+ '\n'.join(lines)+'\n+2: '+score,'#fffaf0')
    y+=198
txt(60,2515,'KẾT QUẢ VÀ MỞ KHÓA',30)
box(60,2570,530,120,'Lấy max(S[c]); tối đa 18 điểm / kiểu.\nCó đồng điểm? TRUE → cho tự chọn.\nFALSE → một gợi ý cao nhất.')
arrow(590,2630,680,2630)
box(680,2570,460,120,'Hiển thị kết quả và giải thích.\ncompleted = TRUE\nPhát train-quiz-completed')
arrow(1140,2630,1230,2630)
box(1230,2570,605,120,'Mở toa 02–10: nút, chấm, phím, vuốt.\nLàm lại bài → có thể đổi gợi ý.\nTải lại trang → bắt đầu hành trình mới.')
txt(60,2740,'Gợi ý gu thẩm mỹ; không phải đo lường tâm lý hay suy luận bản sắc dân tộc.',24,rust)
im.save(base/'quiz-logic-map.png')
