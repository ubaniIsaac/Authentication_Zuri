# Authentication_Zuri

Authentication system built with node and Json Web Tokens
Users can signup, login and logout.
There are 4 user roles; Manager. Admin, Staff and User. Each role has an individual route,
I also added specific functions like the ability to see all users to the manager and the ability to delete a user account to admin.

Password recovery feature included. Node API sends a mail using nodemailer to the user account email. The mail contains the link containing the user ID and a token automatically generated to reset the password



![mail-link](https://user-images.githubusercontent.com/32121772/183269657-bd94961d-1133-40f3-83ef-9785edd33739.png)

![logout](https://user-images.githubusercontent.com/32121772/183269658-34c09120-1036-478e-8fb4-d8f2ca3a745d.png)

![password-reset-email](https://user-images.githubusercontent.com/32121772/183269659-8b806d63-2f17-4a0c-9ee2-595d609928da.png)

![password-reset](https://user-images.githubusercontent.com/32121772/183269660-a4c6e584-3ac2-4500-8367-29f84aca52a0.png)
