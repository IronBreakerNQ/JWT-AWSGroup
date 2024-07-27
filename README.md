# JWT-AWSGroup
Ý tưởng: Tạo ra 1 hệ thống phân quyên người dùng và xác thực với thuật toán bất đối xứng JWT
## Hệ thống phần quyền người dùng
### Mind map 
![Screenshot (1857)](https://github.com/user-attachments/assets/9ea97da6-17a2-485b-951c-d703633e075f)
```plaintext
  Group:
    Field:task,user
    Menthod: 
      -User:create a store task , create a store include user.
    Tạo ra 1 nhóm để chứ dữ liệu.
  User:
    Field: task.
    Menthod: CUR task.
    Là cấp thấp nhất trong mô hình phân quyền người dùng nên chỉ thục hiện các chức năng CUR , không có delete !
  Admin:
    Field: user,admin,group.
    Menthod:
      -User:  CRUD, add role and remove role.
      -Admin: Update,delete.
      -Group: CRUD group, add user include group,Select services for group.
      Là cấp cao nhất trong mô hình phân quyền tương tác hầu hết vớ user và group !
  Root: 
    Field: admin..
    Menthod: 
     -Admin:create admin. 
    Có chức năng tạo ra các tài khoản admin mới , lấy lại các tài khoản admin khi bị mất.
    *Sau khi tạo xong các admin cần thiết nên xóa hết cache liên quan và không đụng tới **root** nữa !
```
## Thuật toán bất đối xứng JWT
### Mind map:
  ![Screenshot (1858)](https://github.com/user-attachments/assets/3efa8a7f-c895-47e8-84d0-64dcc696b640)
```plaintext
  Public key:
            -Là key được tạo ra có chức năng verify token
            -Được lưu trong database
            -Không sợ bị mất
  Private Key:
            -Là key được tạo ra có chức năng create token
            -Được cung cấp cho người dùng
            -Không lưu trong database
*Với thuật toán bất đối xứng khi hacker xâm nhập vào hệ thống thì chỉ lấy được public key không lấy được private key
```
### Token bị hacker lấy được:
  ![Uploading Screenshot (1867).png…]()

### AccessToken và RefreshToken:

