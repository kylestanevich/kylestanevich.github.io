import csv
import re

with open('titan2.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        lat_v = re.split(''':\s|°|'|""''',row[4])
        lon_v = re.split(''':\s|°|'|""''',row[5])
        lat = int(lat_v[1]) + int(lat_v[2])/60 + float(lat_v[3])/3600
        lon = int(lon_v[1]) + int(lon_v[2])/60 + float(lon_v[3])/3600
        
        # print(row)
        # print(f'{lat:.7f},{lon:.7f}')
        
        print(f'''<Placemark>
    <name>{row[0]}</name>
    <description>{row[1]}</description>
    <address>{row[2]}, {row[3]}</address>
    <Point>
        <coordinates>-{lon:.7f},{lat:.7f},0</coordinates>
    </Point>
</Placemark>''')
