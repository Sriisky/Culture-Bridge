# Generated by Django 4.0.1 on 2023-12-06 22:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='React',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('song', models.CharField(max_length=50)),
                ('eventType', models.CharField(max_length=50)),
                ('population', models.IntegerField()),
                ('courseName', models.CharField(max_length=50)),
            ],
        ),
    ]
