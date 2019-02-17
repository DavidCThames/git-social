#!/bin/bash

exec docker build -t temp .
exec docker tag temp:latest gcr.io/kube-231906/vthacks_back:latest
exec docker push gcr.io/kube-231906/vthacks_back:latest
exec kubectl patch deployment vt-back -p  '{"spec":{"template":{"spec":{"terminationGracePeriodSeconds":31}}}}'
exec kubectl patch deployment vt-back -p  '{"spec":{"template":{"spec":{"terminationGracePeriodSeconds":30}}}}'
echo "done"
