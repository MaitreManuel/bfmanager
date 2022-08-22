# BabyFoot Manager

BabyFoot Manager is a [RIA](https://en.wikipedia.org/wiki/Rich_Internet_application) application which allow to generate babyfoot games. The main feature is to create games in colaborative way.

### Prerequisite

You'll need to have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.

### How to install

```
git clone https://github.com/MaitreManuel/bfmanager.git
cd bfmanager
docker-compose up -d
docker-compose exec node npm install
```

### How to setup database (the lazy way)

1. Go to http://localhost:16543/login, you'll be redirect to pgAdmin.
2. Use this credentials, Email = admin@adm.com Password = admin
3. On top left corner, right click on __Servers (1)__ > __Register__ > __Server...__

![image](https://user-images.githubusercontent.com/23707008/185819793-b195b793-2bbc-422d-8a4c-05fe4e54f504.png)

4. On the __General__ tab, set __Name__ to "bfmanager".

![image](https://user-images.githubusercontent.com/23707008/185819685-a7a96b7e-80f9-46ba-adab-7cec9da8205a.png)

5. On the __Connection__ tab, set __Hostname/address__ to "postgres", __Username__ to "root" and __Password__ to "root', then click on __Save__.

![image](https://user-images.githubusercontent.com/23707008/185819711-57acd6b6-5ad1-42b8-b62b-6afe1db2a300.png)

6. Then a __Databases__ entry appear, right click on it, __Create__ > __Database...__

![image](https://user-images.githubusercontent.com/23707008/185819765-50938a7c-d518-4848-9338-a02eb40df1e2.png)

7. Set __Database__ to bfmanager and click on __Save__.

![image](https://user-images.githubusercontent.com/23707008/185819828-5dc2d5a0-4e74-463a-9224-ffb1a4807468.png)

8. Then right click on bfmanager bellow __Databases__, and click __Query Tool__.

![image](https://user-images.githubusercontent.com/23707008/185819858-c97c174c-e195-4093-87a5-499c7fbdf7cb.png)

9. Copy the content of `_dump/bfmanager.sql` on the root folder of your fresh downloaded git repository and paste it on the __Query__ section.
10. Finally press F5 or click the "Play" button.

### How to display the app

Open the file present in `client/index.html` and you'll see the most beautiful interface of all time 👌

![image](https://user-images.githubusercontent.com/23707008/185820000-19febfd5-2b04-4790-95a1-62d647fd83d1.png)

Enjoy ! ⚽ 🍺
