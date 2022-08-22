# BabyFoot Manager

BabyFoot Manager is a [RIA](https://en.wikipedia.org/wiki/Rich_Internet_application) application which allow to generate babyfoot games. The main feature is to create games in colaborative way.

### Prerequisite

You'll need to have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.

### How to install

```
git clone https://github.com/MaitreManuel/bfmanager.git
cd bfmanager
docker-compose exec node npm install
```

### How to setup database (the lazy way)

1. Go to http://localhost:16543/login, you'll be redirect to pgAdmin.
2. Use this credentials, Email = admin@adm.com Password = admin
3. On top left corner, right click on __Servers (1)__ > __Register__ > __Server...__

4. On the __General__ tab, set __Name__ to "bfmanager".

5. On the __Connection__ tab, set __Hostname/address__ to "postgres", __Username__ to "root" and __Password__ to "root', then click on __Save__.

6. Then a __Database__ entry appear, right click on it, __Create__ > __Database...__

7. Set __Database__ to bfmanager and click on __Save__.

8. Then right click on bfmanager bellow __Database__, and click __Query Tool__.
9. Copy the content of `_dump/bfmanager.sql` on the root folder of your fresh downloaded git repository and paste it on the __Query__ section.
10. Finally press F5 or click the "Play" button.

### How to display the app

Open the file present in `client/index.html`.
