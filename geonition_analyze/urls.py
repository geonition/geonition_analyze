# -*- coding: utf-8 -*-
from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import url
from views import proto
from django.views.generic import TemplateView

urlpatterns = patterns('geonition_analyze.views',
                       url(r'^$',
                           proto),
            
        )
