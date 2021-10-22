#!make

PROJECT = "Mini-project Pointage"

MAKEFLAGS += --silent
include .env
export $(shell sed 's/=.*//' .env)

dev: ;@echo "Testing ${PROJECT}....."

test:
    NODE_ENV=test \
    LOG_ENABLED=false \
    LOG_LEVEL=silent \
    npm test

.PHONY: dev test watch clean
