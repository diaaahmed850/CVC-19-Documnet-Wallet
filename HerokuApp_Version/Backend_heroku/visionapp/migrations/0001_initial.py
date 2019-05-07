# Generated by Django 2.2 on 2019-04-22 20:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import visionapp.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='documentModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('docType', models.SmallIntegerField(choices=[(0, 'ID'), (1, 'Passport'), (2, 'Other')], default=2)),
                ('data', visionapp.models.jsonFieldHelper()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]