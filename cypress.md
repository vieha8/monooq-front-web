### Cách kiểm tra coverage của một trang sử dụng Cypress

Giả sử muốn kiếm tra trang có đường dẫn là `/abc/xyz`

Trước tiên viết test case cho trang này vào thử mục `/cypress/integration`. Giả sử đặt tên là abc-xyz.spec.js. Nội dung file này sẽ là:

```javascript
describe('Home Page', () => {
  context('iphone 6 resolution', () => {
    beforeEach(() => {
      cy.viewport('iphone-6');
    });
    describe('When you visit abc/xyz', () => {
      it('Visit abc/xyz', () => {
        cy.visit('/abc/xyz');
      });
    });
  });
});

```

Sau đó chạy lệnh:

```bash
yarn e2e
```

Sau một lúc cửa sổ sau sẽ hiện ra

![](https://i.imgur.com/IxYDT0E.png)

Tìm và chọn test case trong list có tiêu đề là `abc-xyz.spec.js`

Cypress lúc này sẽ chạy test case, và đo coverage cho từng file, rồi output kết quả ra thư mục `coverage/`

Lúc này ta sẽ mở `coverage/lcov-report/index.html`, để xem kết quả.

```
 google-chrome coverage/lcov-report/index.html
```

Giao diện kết quả sẽ giống như sau (chính là kết quả hiện tại của trang homepage, trên nhánh `change_nextjs`)

![](https://i.imgur.com/zjtw3Iu.png)

Nhiều file coverage khá thấp, đặc biệt cần chú ý đến `redux/modules`

Lý do là vì hiện tại khi vào một trang redux sẽ load toàn bộ logic state (của tất cả các trang), mặc dù nhiều logic không được dùng, gây ra việc lighthouse cảnh báo Remove unused Javascript ngay vị trí đầu tiên của list cảnh báo. 