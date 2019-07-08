# contact-app

A simmple application for store peoples names!

###### Contents
- Clone
- Install Requirements
- Migrations & Migrate
- Run The App
- Application
- Admin Panel

#### Clone


At first clone the repository using git command or download it as zip. 

```shell
$ git clone https://github.com/zxalif/contact-app.git && cd contact-app
```

#### Install Requirements

Use pip or pip3 to install dependencies.

```shell
$ pip3 install --upgrade -r requirements.txt
```
***Or***

```shell
$ pip install --upgrade -r requirements.txt 
```

#### Migrations & Migrate

After installing the requirements.txt run this two command to create table and execute the sql.

```shell
$ python3 manage.py makemigrations
No changes detected
$ python3 manage.py migrate
Operations to perform:
  Apply all migrations: admin, auth, contacts, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying admin.0003_logentry_add_action_flag_choices... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying auth.0009_alter_user_last_name_max_length... OK
  Applying auth.0010_alter_group_name_max_length... OK
  Applying auth.0011_update_proxy_permissions... OK
  Applying contacts.0001_initial... OK
  Applying sessions.0001_initial... OK
```

#### Run The App

After finishing all the step just run the app using this bellow command!

```shell
$ python3 manage.py runserver
System check identified no issues (0 silenced).
July 08, 2019 - 06:36:26
Django version 2.2.3, using settings 'contactapp.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

#### Application

All done, now go to the server url i.e. ```http://127.0.0.1:8000/```.

#### Admin Panel

To view admin panel you have to create a superuser/admin first. To do so, run this following command to create a superuser and fill all the input.

```shell
$ python3 manage.py createsuperuser 
Username (leave blank to use 'alif'): alif
Email address: 
Password: 
Password (again):
Superuser created successfully.
```

Now, go to ```127.0.0.0:8000/admin/``` and fill the login user name and password.