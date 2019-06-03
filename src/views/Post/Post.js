import React, { Fragment } from 'react';
import avatar from '../../assets/img/avatar.jpg';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';

function App() {
  return (
    <Fragment>
      <LeftSideBar/>
      <div className="container m-auto">
        <div className="post m-auto">
          <div className="postContent">
            <h1 className="title pt-2 desktop:pt-24"><span>Thời thanh xuân sẽ qua - Lãng Du</span></h1>
            <div className="flex bg-white rounded-lg pt-4 pb-4 author items-center">
              <img className="w-10 h-10 rounded-full mx-auto" alt="no description" src={avatar}/>
              <div className="text-left flex-1 pl-2">
                <div className="leading-tight">Nichibu Meme</div>
                <div className="info">
                  <div className="text-gray-600 text-xs leading-tight inline">Jun 03</div>
                </div>
              </div>
            </div>
            <div className="markdown text-justify">
              <p>Huế,<br/>
                Không mang trong mình vẻ ồn ào náo nhiệt như Hà Nội hay Sài Gòn, hay cũng không giống với bất cứ nơi nào
                mà anh đã từng đặt chân đến, thành phố này từ xưa tới nay luôn khoác lên mình một bộ dạng trầm mặc, cổ
                kính và đậm chất thơ. Huế bình lặng từ cảnh vật cho đến con người, vẻ đẹp lãng mạn mang chút màu sắc
                đượm buồn làm cho người ta người ta cảm thấy quên đi hết thảy mọi âu lo mệt nhọc, quên đi hết những bon
                chen xô bồ trong cuộc sống để hoà mình vào cái bầu không khí đó. Cũng như một đời người, càng trải qua
                nhiều, càng chứng kiến nhiều thì người ta sẽ càng trầm mặc hơn, huống hồ thành phố này đã trải qua biết
                bao thăng trầm của lịch sử, chứng kiến hết thảy những thịnh suy của nước nhà.</p>
              <p>Đã thành một thói quen, cứ mỗi buổi chiều khi hoàng hôn buông xuống trên những mái nhà cổ kính của cố
                đô, An Nhiên lại để bước chân mình tự do lang thang dạo bước bên bờ dòng sông Hương thơ mộng, dòng sông
                ánh lên màu ngọc bích đẹp đến mê người trong ánh chiều tà, nơi đã trở thành nguồn cảm hứng cho biết bao
                tác phẩm thi ca bất hủ. Và với một kẻ có tâm hồn lúc nào cũng bay bổng như An Nhiên thì còn nơi nào hợp
                để dừng chân hơn thành phố này nữa? Bước chân lang thang vô định, anh chợt nhớ về ngày xưa, cũng trong
                một buổi chiều hoàng hôn tuyệt đẹp như thế này, anh lần đầu đặt chân tới Huế…</p>
              <hr/>
              <p>Tokyo, 5 năm trước<br/>
                Chàng kĩ sư An Nhiên vừa kịp lao lên trước khi chuyến tàu cuối cùng trong ngày chuyển bánh, lại thêm
                một ngày làm việc tới kiệt sức nữa khi mà gần đây dự án anh đang làm có dấu hiệu chậm tiến độ. Mỗi
                ngày ngồi trên chuyến tàu về nhà anh đều tự hỏi rằng mình đang làm cái gì với ngày tháng tuổi trẻ của
                mình ở đây vậy nhỉ? 5 năm cuộc đời trôi qua chỉ là chuỗi những ngày đi làm để được chấm công, miệng
                cười như nắng hạ nhưng lòng thì chớm đông. Bao nhiêu áp lực, bao nhiêu chán nản đã trải qua để rồi rút
                cuộc anh được lại gì? Chẳng gì cả khi mà ngày ngày cứ đi làm như một cái máy, ngồi vào bàn làm công
                việc mà mình vốn chẳng hề yêu thích để rồi lại nghĩ nếu ngày xưa mình mạnh dạn theo đuổi đam mê thì
                giờ sẽ thế nào nhỉ? Có thể cuộc sống sẽ khó khăn hơn, chắc là thế rồi, nhưng anh biết chắc chắn một
                điều là mình sẽ chẳng phải ngồi luyến tiếc như bây giờ. Và anh chợt nhận ra là vẫn chưa quá muộn để có
                thể làm lại từ đầu. Khẽ nở một nụ cười đầu tiên sau bao ngày mệt nhọc, anh đã có quyết định của
                mình.<br/>
                Đã đến lúc để về nhà!</p>
              <hr/>
              <p>Hai tháng kể từ sau buổi tối định mệnh đó, An Nhiên bước ra khỏi sân bay Nội Bài trong một chiều
                thu lộng gió. Lại được hít thở bầu không khí tươi mới của Hà Nội làm anh thêm một lần cảm thấy quyết
                định trở về của mình là đúng đắn. An Nhiên chỉ đứng lặng ở đó, tận hưởng từng làn gió quê hương khẽ
                lướt qua trên khuôn mặt, đã bao lâu rồi anh mới thấy thoải mái như vậy nhỉ, có lẽ là lâu lắm
                rồi…</p>
              <p>Đang trong cơn mơ màng thì bỗng chợt có tiếng nói:</p>
              <ul>
                <li>Xem ai đó Việt Kiều về nước kìa, trông trưởng thành ghê ha</li>
                <li>À, con dù có lớn thế nào thì vẫn cứ là thằng Nhiên bé bỏng của bố mẹ thôi, vẫn thèm được bố cõng
                  đi chơi hay là sà vào lòng mẹ như hồi còn bé. Anh quay lại tươi cười với một cặp vợ chồng già đang
                  đi về phía mình.
                </li>
                <li>Gớm, anh chẳng cõng tôi thì thôi chứ giờ ai cõng nổi anh nữa, to đầu rồi mà còn như đứa trẻ…
                </li>
                <li>Thì con vẫn là thằng Nhiên “bé bỏng” của bố mẹ mà….</li>
                <li>Cỡ anh thì bé bỏng cái nỗi gì nữa hả trời, cao hơn mẹ một cái đầu rồi. Mà thôi, dù gì đi nữa thì
                  cũng chào mừng trở về nhà, con trai.
                </li>
                <li>Dạ vâng, con về rồi đây, tối nay mẹ nấu món gì ngon ngon nhé, con thèm đồ Việt lắm rồi,…</li>
                <li>Tưởng gì, cái đó thì dễ thôi, rau muống luộc chấm tương luôn sẵn sàng - Mẹ anh vui vẻ đáp
                  lại.<br/>
                  Đoạn đường về nhà cứ thế trôi qua trong tiếng cười hạnh phúc của cả gia đình.
                </li>
                <li>Thế sau này con định thế nào? Bất chợt bố anh cất tiếng hỏi.</li>
                <li>À, về chuyện đó thì con định sẽ theo đuổi nghiệp viết bố ạ. Con tính làm một chuyến đi khắp đất
                  nước để tìm hiểu về cuộc sống, về con người nước mình, rồi dừng lại ở một nơi nào đó và tập trung
                  vào viết lách, con mong bố mẹ sẽ không phản đối,…
                </li>
                <li>Ái chà, mẹ nó xem kìa, con trai chúng ta tâm hồn nghệ sĩ ghê chưa, có một nhà văn trong nhà kể
                  cũng thú vị đấy chứ nhỉ? Bố anh cười hiền.
                </li>
                <li>Bố mẹ chẳng có lí do gì để phản đối con cả, con lớn rồi, cuộc đời của con là do con quyết định,
                  phận làm cha mẹ thấy con mình được sống hạnh phúc với niềm đam mê là vui lắm rồi. Chứ giờ mà ép
                  con phải làm điều mà con không thích rồi để lúc nào nhìn cái mặt cũng như đưa đám thì bố mẹ tội to
                  lắm, gánh không nổi. Chỉ là khi nào cảm thấy mệt mỏi quá thì cứ về nhà nhé, bố mẹ nuôi.
                </li>
                <li>Dạ vâng, thế thì chắc con sẽ về nhà suốt đấy ạ. Vừa nói anh vừa phải cúi người tránh cái đánh
                  yêu của mẹ, đoạn đường về tràn ngập tiếng cười.
                </li>
              </ul>
              <hr/>
              <p>An Nhiên ở nhà với bố mẹ một tháng rồi mới bắt đầu cuộc hành trình của mình, cuộc hành trình đưa
                anh qua mọi miền của tổ quốc. Từ cột cờ Lũng Cú cho tới mũi Cà Mau, từ núi rừng Tây Bắc bạt ngàn
                cho tới quần đảo Trường Sa đầy nắng và gió. Ở mỗi nơi anh đặt chân đến, anh đều hoà mình vào sống
                cuộc sống của người dân bản xứ, trải nghiệm những điều mà trước giờ anh chỉ nghe được nghe thấy
                trên sách báo hay tv. Càng đi nhiều anh lại càng thấy mình nhỏ bé, tiếp xúc với nhiều người càng
                làm anh thấy được tầm hiểu biết của mình hạn hẹp thế nào. Từ những đêm lênh đênh trên biển nghe
                chuyện về cuộc đời của một bác ngư dân tới những ngày cưỡi voi ở Đắk Lắk, từ một buổi chiều ngồi
                nghe những hồi ức chiến tranh của một cựu chiến binh ở Thành Cổ Quảng Trị tới những buổi sáng sớm
                Sài Gòn bình minh lên trên dinh Độc Lập. Tất cả đã trở thành những trải nghiệm tuyệt vời trong
                cuộc đời của An Nhiên, định hình nên phong cách viết của anh tới tận bây giờ.<br/>
                Rồi một buổi chiều kia, anh đặt chân đến Huế…</p>
              <p>Thành phố này thu hút anh ngay từ lúc mới đặt chân xuống sân ga…Huế có một điều gì đó nhẹ nhàng
                mà sâu lắng, không gian cổ kính và đầy lãng mạn làm anh biết ngay rằng đây chính là nơi mà mình
                thuộc về.</p>
              <hr/>
              <p>Mới đó mà cũng đã mấy năm anh ở lại thành phố này, những cuốn sách anh viết ra cũng đã được
                xuất bản và được công chúng đón nhận, nhưng anh vẫn muốn viết ra một điều gì đó thật đặc biệt,
                đó chính là lí do mà chiều nào anh cũng dạo bước bên dòng sông thơ mộng này, để suy nghĩ về ý
                tưởng cho cuốn sách sắp tới.</p>
              <p>Đang mông lung trong dòng suy nghĩ, bỗng chợt có một giọng phụ nữ quen quen vang lên:</p>
              <ul>
                <li>Ủa có phải là nhà văn An Nhiên không ta</li>
              </ul>
              <p>An Nhiên giật mình quay lại, thật không thể tin nổi vào mắt mình, trước mặt anh là Tường Vi,
                người mà đã lâu lắm rồi anh không gặp, cũng không còn liên lạc nữa. An Nhiên ú ớ:</p>
              <ul>
                <li>Ơ, Vi à, cậu làm gì ở đây thế?</li>
                <li>Nếu mình nói là đi tìm ai đó bỏ đi và cắt đứt hết liên lạc với bạn bè cũ để bắt người đó
                  thực hiện lời hứa thì cậu có tin không?
                </li>
                <li>Trời ạ, đã bao nhiêu năm rồi mà cậu vẫn nhớ cơ à?</li>
                <li>Nhớ chứ, lần này thì cậu đừng hòng chạy trốn được nữa nhé. Tường Vi nở một nụ cười tinh
                  nghịch như ngày nào rồi kéo An Nhiên đi về phía hoàng hôn…
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
