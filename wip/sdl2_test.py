
import sys
import sdl2
import sdl2.ext

import time
import random



WHITE = sdl2.ext.Color(255, 255, 255)
BLACK = sdl2.ext.Color(0, 0, 0)



class Player(sdl2.ext.Entity):
    def __init__(self, world, sprite, posx=0, posy=0):
        self.sprite = sprite
        self.sprite.position = posx, posy

class Button(sdl2.ext.Entity):
    def __init__(self, world, sprite, posx=0, posy=0):
        self.sprite = sprite
        self.sprite.position = posx, posy

class Text(sdl2.ext.Entity):
    def __init__(self, world, sprite, posx=0, posy=0):
        self.sprite = sprite
        self.sprite.position = posx, posy

def myfunc(button, event):
    print('button clicked')

def run():
    
    size_h = 800
    size_v = 600
    
    sdl2.ext.init()
    
    # window = sdl2.ext.Window("The Pong Game", size=(size_h, size_v))
    # window = sdl2.ext.Window("The Pong Game", size=(size_h, size_v),flags=sdl2.SDL_WINDOW_BORDERLESS)
    window = sdl2.ext.Window("The Pong Game", size=(size_h, size_v),flags=sdl2.SDL_WINDOW_RESIZABLE)
    window.show()
    
    
    
    texture_renderer = sdl2.ext.Renderer(window)
    spriterenderer = sdl2.ext.TextureSpriteRenderSystem(texture_renderer)
    spfactory = sdl2.ext.SpriteFactory(sdl2.ext.TEXTURE, renderer=texture_renderer)
    
    uifactory = sdl2.ext.UIFactory(spfactory)
    uiprocessor = sdl2.ext.UIProcessor()
    
    
    
    sp_background = spfactory.from_color(BLACK, size=(size_h, size_v))
    sp_background.depth=-1
    
    sp_paddle1 = spfactory.from_color(WHITE, size=(20, 100))
    sp_paddle2 = spfactory.from_color(WHITE, size=(20, 100))
    
    ui_button = uifactory.from_color(sdl2.ext.BUTTON,color=sdl2.ext.Color(255,0,255),size=(100,50))
    ui_button.click += myfunc
    
    
    
    world = sdl2.ext.World()
    
    world.add_system(spriterenderer)
    
    background = Player(world, sp_background)
    
    player1 = Player(world, sp_paddle1, 0, 250)
    player2 = Player(world, sp_paddle2, 780, 250)
    
    button = Button(world, ui_button, 10, 10)
    
    
    
    
    
    
    
    running = True
    while running:
        events = sdl2.ext.get_events()
        for event in events:
            if event.type == sdl2.SDL_QUIT:
                running = False
                break
            
            if event.type == sdl2.SDL_KEYDOWN:
                if event.key.keysym.sym == sdl2.SDLK_UP:
                    print('up')
                    print(window.size[0])
                    window.size = (window.size[0]+1,window.size[1])
                elif event.key.keysym.sym == sdl2.SDLK_DOWN:
                    print('down')
            elif event.type == sdl2.SDL_KEYUP:
                if event.key.keysym.sym in (sdl2.SDLK_UP, sdl2.SDLK_DOWN):
                    print('done')
            
            if event.type == sdl2.SDL_WINDOWEVENT:
                if event.window.event == sdl2.SDL_WINDOWEVENT_SIZE_CHANGED:
                    print('size change event')
            
            uiprocessor.dispatch(ui_button, event)
        
        sdl2.SDL_Delay(10)
        world.process()


if __name__ == "__main__":
    sys.exit(run())





