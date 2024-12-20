# Generated by Django 5.1.2 on 2024-11-20 14:51

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_consultation_end_time_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='queue',
            name='called_at',
        ),
        migrations.RemoveField(
            model_name='queue',
            name='category',
        ),
        migrations.RemoveField(
            model_name='queue',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='queue',
            name='disponivel',
        ),
        migrations.RemoveField(
            model_name='queue',
            name='ticket',
        ),
        migrations.RemoveField(
            model_name='queue',
            name='triage_nurse',
        ),
        migrations.RemoveField(
            model_name='queue',
            name='updated_at',
        ),
        migrations.AddField(
            model_name='queue',
            name='date_created',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='queue',
            name='senha',
            field=models.CharField(blank=True, editable=False, max_length=20),
        ),
        migrations.AddField(
            model_name='queue',
            name='time_called',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='queue',
            name='doctor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.doctor'),
        ),
        migrations.AlterField(
            model_name='queue',
            name='nurse',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.nurse'),
        ),
        migrations.AlterField(
            model_name='queue',
            name='observations',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='queue',
            name='pacient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.pacient'),
        ),
        migrations.AlterField(
            model_name='queue',
            name='priority',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='queue',
            name='status',
            field=models.CharField(choices=[('pre_triagem', 'Pré-triagem'), ('triagem', 'Triagem'), ('pre_atendimento', 'Pré-atendimento'), ('em_atendimento', 'Em Atendimento'), ('pos_atendimento', 'Pós-atendimento'), ('finalizado', 'Finalizado')], default='pre_triagem', max_length=20),
        ),
    ]
