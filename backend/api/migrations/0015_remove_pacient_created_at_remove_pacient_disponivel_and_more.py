# Generated by Django 5.1.2 on 2024-12-03 03:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_remove_queue_priority_queue_comorbidities'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pacient',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='pacient',
            name='disponivel',
        ),
        migrations.RemoveField(
            model_name='pacient',
            name='updated_at',
        ),
    ]