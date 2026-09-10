import struct
import zlib
import os

def create_png(filename, size):
    width = size
    height = size
    
    # 8-bit RGBA image
    raw_data = bytearray()
    
    # Radius for center rounded rect
    margin = size // 6
    rect_min = margin
    rect_max = size - margin
    corner_r = size // 5
    
    # Colors
    bg_r, bg_g, bg_b, bg_a = 12, 14, 18, 255          # #0c0e12
    brand_r, brand_g, brand_b, brand_a = 0, 214, 143, 255  # #00d68f (emerald green)
    fg_r, fg_g, fg_b, fg_a = 10, 10, 10, 255          # #0a0a0a (black text/icon)
    
    for y in range(height):
        raw_data.append(0)  # Filter type 0 (None)
        for x in range(width):
            # Check if inside center rounded rectangle
            in_rect = False
            # Check corners
            cx = min(max(x, rect_min + corner_r), rect_max - corner_r)
            cy = min(max(y, rect_min + corner_r), rect_max - corner_r)
            dx = x - cx
            dy = y - cy
            if (dx*dx + dy*dy) <= corner_r * corner_r and rect_min <= x <= rect_max and rect_min <= y <= rect_max:
                in_rect = True
            
            if in_rect:
                # Inside green emblem, draw stylized "L" letter
                # L horizontal and vertical stems
                l_x1 = size // 2 - size // 8
                l_x2 = size // 2 - size // 18
                l_y1 = size // 2 - size // 6
                l_y2 = size // 2 + size // 6
                
                l_base_x1 = l_x1
                l_base_x2 = size // 2 + size // 7
                l_base_y1 = size // 2 + size // 10
                l_base_y2 = l_y2
                
                in_stem = (l_x1 <= x <= l_x2 and l_y1 <= y <= l_y2)
                in_base = (l_base_x1 <= x <= l_base_x2 and l_base_y1 <= y <= l_base_y2)
                
                if in_stem or in_base:
                    raw_data.extend([fg_r, fg_g, fg_b, fg_a])
                else:
                    raw_data.extend([brand_r, brand_g, brand_b, brand_a])
            else:
                raw_data.extend([bg_r, bg_g, bg_b, bg_a])
                
    # Compress with zlib
    compressed = zlib.compress(bytes(raw_data), 9)
    
    def chunk(tag, data):
        c = struct.pack("!I", len(data)) + tag + data
        crc = zlib.crc32(tag + data) & 0xffffffff
        return c + struct.pack("!I", crc)
        
    png = b"\x89PNG\r\n\x1a\n"
    # IHDR: width, height, bit_depth(8), color_type(6: RGBA), compression(0), filter(0), interlace(0)
    ihdr = struct.pack("!IIBBBBB", width, height, 8, 6, 0, 0, 0)
    png += chunk(b"IHDR", ihdr)
    png += chunk(b"IDAT", compressed)
    png += chunk(b"IEND", b"")
    
    with open(filename, "wb") as f:
        f.write(png)
    print(f"Created {filename} ({size}x{size})")

os.makedirs("public", exist_ok=True)
create_png("public/icon-192.png", 192)
create_png("public/icon-512.png", 512)
create_png("public/screenshot-mobile.png", 512)
