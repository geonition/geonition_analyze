# -*- coding: utf-8 -*-
from django.conf.urls.defaults import patterns
from django.conf.urls.defaults import url
from views import proto

urlpatterns = patterns('geonition_analyze.views',
                       url(r'^$',
                           proto,
                           name="analyze"),
            
        )
