import bpy
import random
from math import ceil

print(random.uniform(-4,4))
scene = bpy.context.scene

mball = bpy.data.metaballs.new("MetaBall")
obj = bpy.data.objects.new("MetaBallObject", mball)
scene.objects.link(obj)

mball.resolution = 0.2
mball.render_resolution = 0.02
rMax = 5.50
rMin = 0.50
mballcount = 5
coMin = -2
coMax = 2

for i in range(mballcount):
    coordinate = tuple(random.uniform(coMin,coMax) for i in range(3))

    element = mball.elements.new()
    element.co = coordinate
    element.radius = random.uniform(rMin, rMax)
    
currframe = 0
fcount = 8
frange = bpy.context.scene.frame_end - bpy.context.scene.frame_start
initElems = mball.elements

if frange == 0:
    bpy.context.scene.frame_end = 150
    bpy.context.scene.frame_start = 0
    frange = 150

fincr = ceil(frange / (fcount - 1))

for f in range(0, fcount, 1):
    
    for j in range(mballcount):
        el = mball.elements[j]

        newRadius = random.uniform(rMin, rMax)
        x, y, z = tuple(random.uniform(coMin,coMax) for i in range(3))
        el.co = (x, y, z)
        el.radius = newRadius
        el.keyframe_insert(data_path='co')
        el.keyframe_insert(data_path='radius')
    
    bpy.context.scene.frame_set(currframe)
    currframe += fincr
