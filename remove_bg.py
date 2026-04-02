from PIL import Image
import os

def remove_background(image_path, output_path, target_color=(255, 255, 255), threshold=30):
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    new_data = []
    for item in datas:
        # Calculate distance to target color
        dist = sum((item[i] - target_color[i])**2 for i in range(3))**0.5
        if dist < threshold:
            new_data.append((255, 255, 255, 0)) # Transparent
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")

# List of files and their target background colors
files = [
    ("/Users/PiedroLacerda/Documents/futurion/futurion/public/Antecipy.png", "/Users/PiedroLacerda/Documents/futurion/futurion/public/Antecipy.png", (255, 255, 255), 40), # White
    ("/Users/PiedroLacerda/Documents/futurion/futurion/public/cloud.JPEG", "/Users/PiedroLacerda/Documents/futurion/futurion/public/cloud.png", (255, 255, 255), 40), # White
    ("/Users/PiedroLacerda/Documents/futurion/futurion/public/insure.png", "/Users/PiedroLacerda/Documents/futurion/futurion/public/insure.png", (12, 33, 61), 50), # Dark Blue from viewed image
    ("/Users/PiedroLacerda/Documents/futurion/futurion/public/monica.png", "/Users/PiedroLacerda/Documents/futurion/futurion/public/monica.png", (180, 160, 160), 60), # Mauve-ish
    ("/Users/PiedroLacerda/Documents/futurion/futurion/public/tirzz.png", "/Users/PiedroLacerda/Documents/futurion/futurion/public/tirzz.png", (0, 0, 0), 30), # Black
]

for src, out, color, thresh in files:
    if os.path.exists(src):
        try:
            remove_background(src, out, color, thresh)
            print(f"Processed {os.path.basename(src)} -> {os.path.basename(out)}")
        except Exception as e:
            print(f"Error processing {src}: {e}")
    else:
        print(f"File not found: {src}")
