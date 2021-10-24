#!make

PROJECT = "Mini-project Pointage"

MAKEFLAGS += --silent
include .env
export $(shell sed 's/=.*//' .env)

dev: ;@echo "Testing ${PROJECT}....."

.PHONY: dev
