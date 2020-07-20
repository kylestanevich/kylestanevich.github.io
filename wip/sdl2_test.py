# import sys
# import sdl2.ext

# RESOURCES = sdl2.ext.Resources(__file__, "resources")

# sdl2.ext.init()

# window = sdl2.ext.Window("Hello World!", size=(640, 480))
# window.show()

# factory = sdl2.ext.SpriteFactory(sdl2.ext.SOFTWARE)
# sprite = factory.from_image(RESOURCES.get_path("hello.bmp"))

# spriterenderer = factory.create_sprite_render_system(window)
# sprite.position = 55, 10
# spriterenderer.render(sprite)

# processor = sdl2.ext.TestEventProcessor()
# processor.run(window)

# sdl2.ext.quit()


import sys
import sdl2
import sdl2.ext

import time


WHITE = sdl2.ext.Color(255, 255, 255)


class MovementSystem(sdl2.ext.Applicator):
    def __init__(self, minx, miny, maxx, maxy):
        super(MovementSystem, self).__init__()
        self.componenttypes = Velocity, sdl2.ext.Sprite
        self.minx = minx
        self.miny = miny
        self.maxx = maxx
        self.maxy = maxy

    def process(self, world, componentsets):
        for velocity, sprite in componentsets:
            swidth, sheight = sprite.size
            sprite.x += velocity.vx
            sprite.y += velocity.vy

            sprite.x = max(self.minx, sprite.x)
            sprite.y = max(self.miny, sprite.y)

            pmaxx = sprite.x + swidth
            pmaxy = sprite.y + sheight
            if pmaxx > self.maxx:
                sprite.x = self.maxx - swidth
            if pmaxy > self.maxy:
                sprite.y = self.maxy - sheight


class CollisionSystem(sdl2.ext.Applicator):
    def __init__(self, minx, miny, maxx, maxy):
        super(CollisionSystem, self).__init__()
        self.componenttypes = Velocity, sdl2.ext.Sprite
        self.ball = None
        self.minx = minx
        self.miny = miny
        self.maxx = maxx
        self.maxy = maxy

    def _overlap(self, item):
        pos, sprite = item
        if sprite == self.ball.sprite:
            return False

        left, top, right, bottom = sprite.area
        bleft, btop, bright, bbottom = self.ball.sprite.area

        return (bleft < right and bright > left and
                btop < bottom and bbottom > top)

    def process(self, world, componentsets):
        collitems = [comp for comp in componentsets if self._overlap(comp)]
        if collitems:
            self.ball.velocity.vx = -self.ball.velocity.vx


class Velocity(object):
    def __init__(self):
        super(Velocity, self).__init__()
        self.vx = 0
        self.vy = 0


# class SoftwareRenderer(sdl2.ext.SoftwareSpriteRenderSystem):
    # def __init__(self, window):
        # super(SoftwareRenderer, self).__init__(window)

    # def render(self, components):
        # sdl2.ext.fill(self.surface, sdl2.ext.Color(0, 0, 0))
        # super(SoftwareRenderer, self).render(components)


class TextureRenderer(sdl2.ext.TextureSpriteRenderSystem):
    def __init__(self, renderer):
        super(TextureRenderer, self).__init__(renderer)

    def render(self, components):
        sdl2.ext.fill(self.window, sdl2.ext.Color(0, 0, 0))
        super(TextureRenderer, self).render(components)


class Player(sdl2.ext.Entity):
    def __init__(self, world, sprite, posx=0, posy=0):
        self.sprite = sprite
        self.sprite.position = posx, posy
        self.velocity = Velocity()


class Ball(sdl2.ext.Entity):
    def __init__(self, world, sprite, posx=0, posy=0):
        self.sprite = sprite
        self.sprite.position = posx, posy
        self.velocity = Velocity()


##### kyle edit start #####

class Button(sdl2.ext.Entity):
    def __init__(self, world, sprite, posx=0, posy=0):
        self.sprite = sprite
        self.sprite.position = posx, posy

class Text(sdl2.ext.Entity):
    def __init__(self, world, sprite, posx=0, posy=0):
        self.sprite = sprite
        self.sprite.position = posx, posy

##### kyle edit end #####


def run():
    sdl2.ext.init()
    window = sdl2.ext.Window("The Pong Game", size=(800, 600))
    # window = sdl2.ext.Window("The Pong Game", size=(800, 600),flags=sdl2.SDL_WINDOW_BORDERLESS)
    window.show()
    
    world = sdl2.ext.World()
    
    movement = MovementSystem(0, 0, 800, 600)
    collision = CollisionSystem(0, 0, 800, 600)
    # spriterenderer = SoftwareRenderer(window)
    # spriterenderer = TextureRenderer(window)
    
    
    
    texture_renderer = sdl2.ext.Renderer(window)
    spriterenderer = TextureRenderer(texture_renderer)
    
    print(spriterenderer.__dict__)
    
    factory = sdl2.ext.SpriteFactory(sdl2.ext.TEXTURE, renderer=texture_renderer)

    
    
    world.add_system(movement)
    world.add_system(collision)
    world.add_system(spriterenderer)
    
    # time.sleep(100)
    
    # factory = sdl2.ext.SpriteFactory(sdl2.ext.SOFTWARE)
    # factory = sdl2.ext.SpriteFactory(sdl2.ext.TEXTURE)
    sp_paddle1 = factory.from_color(WHITE, size=(20, 100))
    sp_paddle2 = factory.from_color(WHITE, size=(20, 100))
    sp_ball = factory.from_color(WHITE, size=(20, 20))
    
    ##### kyle edit start #####
    
    # factory_t = sdl2.ext.SpriteFactory(sdl2.ext.SOFTWARE) #how to get TEXTURE to work?
    # factory_t = sdl2.ext.SpriteFactory(sdl2.ext.TEXTURE)
    uifactory = sdl2.ext.UIFactory(factory)
    ui_button = uifactory.from_color(sdl2.ext.BUTTON,color=sdl2.ext.Color(255,0,255),size=(100,50))
    button = Button(world, ui_button, 10, 10)
    
    ##### kyle edit end #####
    
    player1 = Player(world, sp_paddle1, 0, 250)
    player2 = Player(world, sp_paddle2, 780, 250)
    
    ball = Ball(world, sp_ball, 390, 290)
    ball.velocity.vx = -1
    
    collision.ball = ball
    
    running = True
    while running:
        events = sdl2.ext.get_events()
        for event in events:
            if event.type == sdl2.SDL_QUIT:
                running = False
                break
            if event.type == sdl2.SDL_KEYDOWN:
                if event.key.keysym.sym == sdl2.SDLK_UP:
                    player1.velocity.vy = -3
                elif event.key.keysym.sym == sdl2.SDLK_DOWN:
                    player1.velocity.vy = 3
            elif event.type == sdl2.SDL_KEYUP:
                if event.key.keysym.sym in (sdl2.SDLK_UP, sdl2.SDLK_DOWN):
                    player1.velocity.vy = 0
        sdl2.SDL_Delay(10)
        world.process()

if __name__ == "__main__":
    sys.exit(run())





