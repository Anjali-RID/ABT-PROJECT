# -*- coding: utf-8 -*-
# Copyright (c) Vispy Development Team. All Rights Reserved.
# Distributed under the (new) BSD License. See LICENSE.txt for more info.

from __future__ import division, print_function

import sys
from time import sleep
from typing import Callable, Mapping

import numpy as np
from numpy.typing import ArrayLike

from ..gloo import FrameBuffer, RenderBuffer
from ..gloo.context import GLContext, forget_canvas, set_current_canvas
from ..scene.widgets.widget import Widget
from ..util import config as util_config, logger
from ..util.dpi import get_dpi
from ..util.event import EmitterGroup, Event, WarningEmitter
from ..util.keys import Key
from ..util.ptime import time
from . import Application, use_app
from .application import Application

# todo: add functions for asking about current mouse/keyboard state
# todo: add hover enter/exit events
# todo: add focus events

class Canvas(object):
    def __init__(
        self,
        title: str = "VisPy canvas",
        size: tuple[float, float] = ...,
        position: tuple[float, float] | None = None,
        show: bool = False,
        autoswap: bool = True,
        app: str | Application | None = None,
        create_native: bool = True,
        vsync: bool = False,
        resizable: bool = True,
        decorate: bool = True,
        fullscreen: bool | int = False,
        config: Mapping | None = None,
        shared: None | Canvas | GLContext = None,
        keys: str | Mapping | None = None,
        parent: Widget | None = None,
        dpi: None | float = None,
        always_on_top: bool = False,
        px_scale: int = 1,
        backend_kwargs: Mapping | None = None,
    ): ...
    def create_native(self): ...
    def _set_keys(self, keys): ...
    @property
    def context(self): ...
    @property
    def app(self): ...
    @property
    def native(self): ...
    @property
    def dpi(self): ...
    @dpi.setter
    def dpi(self, dpi): ...
    def connect(self, fun: Callable): ...

    # ---------------------------------------------------------------- size ---
    @property
    def size(self): ...
    @size.setter
    def size(self, size): ...
    @property
    def physical_size(self): ...
    @property
    def pixel_scale(self): ...
    @property
    def fullscreen(self): ...
    @fullscreen.setter
    def fullscreen(self, fullscreen): ...

    # ------------------------------------------------------------ position ---
    @property
    def position(self): ...
    @position.setter
    def position(self, position): ...

    # --------------------------------------------------------------- title ---
    @property
    def title(self): ...
    @title.setter
    def title(self, title): ...

    # ----------------------------------------------------------------- fps ---
    @property
    def fps(self): ...
    def set_current(self, event=None): ...
    def swap_buffers(self, event=None): ...
    def show(self, visible: bool = True, run: bool = False): ...
    def update(self, event=None): ...
    def close(self): ...
    def _update_fps(self, event): ...
    def measure_fps(self, window: float = 1, callback: Callable | str = "%1.1f FPS"): ...

    # ---------------------------------------------------------------- misc ---
    def __repr__(self): ...
    def _repr_mimebundle_(self, *args, **kwargs): ...
    def _ipython_display_(self): ...
    def __enter__(self): ...
    def __exit__(self, type, value, traceback): ...
    def render(self, alpha: bool = True) -> ArrayLike: ...

# Event subclasses specific to the Canvas
class MouseEvent(Event):
    def __init__(
        self,
        type: str,
        pos: tuple[int, int] | None = None,
        button: None | int = None,
        buttons: tuple[int, ...] | None = None,
        modifiers: tuple[Key, ...] | None = None,
        delta: tuple[float, float] | None = None,
        last_event: MouseEvent | None = None,
        press_event: MouseEvent | None = None,
        **kwargs,
    ): ...
    @property
    def pos(self): ...
    @property
    def button(self): ...
    @property
    def buttons(self): ...
    @property
    def modifiers(self): ...
    @property
    def delta(self): ...
    @property
    def press_event(self): ...
    @property
    def last_event(self): ...
    @property
    def time(self): ...
    def _forget_last_event(self): ...
    @property
    def is_dragging(self): ...
    def drag_events(self): ...
    def trail(self): ...

class KeyEvent(Event):
    def __init__(self, type: str, key: Key | None = None, text: str = "", modifiers: tuple[Key, ...] | None = None, **kwargs): ...
    @property
    def key(self): ...
    @property
    def text(self): ...
    @property
    def modifiers(self): ...

class ResizeEvent(Event):
    def __init__(
        self, type: str, size: tuple[int, int] | None = None, physical_size: tuple[int, int] | None = None, **kwargs
    ): ...
    @property
    def size(self): ...
    @property
    def physical_size(self): ...

class DrawEvent(Event):
    def __init__(self, type: str, region: tuple[int, int, int, int] | None = None, **kwargs): ...
    @property
    def region(self): ...
