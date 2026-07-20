# Electron State Manager

A lightweight global state library built from scratch in Electron + TypeScript.

## Features

- Global state stored in the main process
- Renderer cache for synchronous reads
- IPC abstraction
- Automatic state broadcasting
- Multi-window synchronization
- Demo chat application

## Architecture

Renderer
    ↓
Renderer Cache
    ↓
IPC
    ↓
Main StateManager
    ↓
Broadcast
    ↓
Every Renderer
