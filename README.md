# Authentication_Zuri

Authentication system built with node and Json Web Tokens
Users can signup, login and logout.
There are 4 user roles; Manager. Admin, Staff and User. Each role has an individual route,
I also added specific functions like the ability to see all users and change the role of a specific user to the manager and the ability to delete a user account to admin.

Password recovery feature included. Node API sends a mail using nodemailer to the user account email. The mail contains the link containing the user ID and a token automatically generated to reset the password


![signup](https://user-images.githubusercontent.com/32121772/183271030-888eed4c-b8ec-42ec-8d01-0a571d827cae.png)

![login](https://user-images.githubusercontent.com/32121772/183271126-64d0c2cf-4ca6-4060-b2aa-3e60c7d36e51.png)

![logout](https://user-images.githubusercontent.com/32121772/183269658-34c09120-1036-478e-8fb4-d8f2ca3a745d.png)
We can see the token deleted from the header after logging out

![manager route](https://user-images.githubusercontent.com/32121772/183271329-c2024ab9-d70d-47cc-928a-c690efe2d80b.png)
Manager route

![admin route](https://user-images.githubusercontent.com/32121772/183271206-c89bb792-81a3-4dbe-baa1-96c0fb9ea828.png) 
Admin route

![staff route](https://user-images.githubusercontent.com/32121772/183271343-1660cffb-433f-4397-9441-489c040e3621.png)
Staff route

![user route](https://user-images.githubusercontent.com/32121772/183271349-a2ae3038-7658-43c0-85b6-efc7f4a6145b.png)
User route

![change role](https://user-images.githubusercontent.com/32121772/183271404-22520134-1d5d-4a96-a82b-7f19afef2ccd.png)
Manager has ability to change user roles

![password-reset-email](https://user-images.githubusercontent.com/32121772/183269659-8b806d63-2f17-4a0c-9ee2-595d609928da.png)


![mail-link](https://user-images.githubusercontent.com/32121772/183269657-bd94961d-1133-40f3-83ef-9785edd33739.png)

![password-reset](https://user-images.githubusercontent.com/32121772/183269660-a4c6e584-3ac2-4500-8367-29f84aca52a0.png)


