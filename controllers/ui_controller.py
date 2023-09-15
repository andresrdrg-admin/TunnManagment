import os
import platform
import signal
import sys
import time
import shutil
from multiprocessing import Process

import zipfile
import psutil
import pystray
from PIL import Image

from controllers.data_controller import DataController
from libs.interactive.controllers.plink import InteractivePLink
from libs.interactive.interactive import Interactive

current_dir = getattr(sys, '_MEIPASS', os.getcwd())
app_dir = os.path.dirname(sys.executable)

icon_path = os.path.join(current_dir, "icon.png")
image = Image.open(icon_path)
image.thumbnail((100, 100), Image.Resampling.LANCZOS)
is_windows = platform.system() == "Windows"

class App():
    _process_data = {}
    def wt(self):
        time.sleep(2000)
    def __init__(self) -> None:
        process_initial = Process(target=self.wt)
        process_initial.start()
        if os.path.exists(f"{app_dir}/app.zip") == False:
            shutil.copy(f"{current_dir}/app.zip", f"{app_dir}/")
        
        if os.path.exists(f"{app_dir}/data.json") == False:
            shutil.copy(f"{current_dir}/data.json", f"{app_dir}/")
            
        if os.path.exists(
            f"{app_dir}/ui.tunnmanagment.munakdigital."+ "exe" if is_windows else "app"
        ) == False:
            archivo_zip = f"{app_dir}/app.zip"
            with zipfile.ZipFile(archivo_zip, "r") as zip_ref:
                zip_ref.extractall(f"{app_dir}")
            os.remove(f"{app_dir}/app.zip")
           
        data_connxns = DataController().data
        self.interactive_plink = InteractivePLink(data_connxns['credentials'], 3)
        for category in data_connxns["data"]:
            connxns_category = data_connxns["data"][category]
            for connx in connxns_category:
                if(connx != "state"):
                    data_connx = connxns_category[connx]
                    trace_with_credential = []
                    ip_bridge = "localhost"
                    for ip_val in data_connx["trace"]:
                        if ip_val in data_connxns['credentials']:
                            trace_with_credential.append(ip_val)
                        else:
                            ip_bridge = ip_val
                    connection_data = (
                        f"{category}.{connx}",
                        data_connx["ports"]["local"],
                        data_connx["ports"]["bridge"],
                        data_connx["ports"]["server"],
                        trace_with_credential,
                        ip_bridge
                    )
                    process = Process(target=self.interactive_plink.create_connection, args=connection_data)
                    self._process_data[f"{category}.{connx}"] = process

        self._process_data["icon_state_run"] = Process(target=self.run)
        self.init_process()
        self.listen_finish_process()

    def run(self):
        icon = self.setup_tray_icon()
        icon.run()

    def init_process(self):
        for _process in self._process_data:
            self._process_data[_process].start()

    def listen_finish_process(self):
        for _process in self._process_data:
            self._process_data[_process].join()

    def on_exit(self):
        for proc in psutil.process_iter(['pid', 'name']):
            if "TunnManagment" in str(proc.info['name']) or "ui.tunnmanagment.munakdigital" in str(proc.info['name']):
                os.kill(proc.info['pid'], signal.SIGTERM)
                print(f"Proceso {proc.info['pid']} detenido correctamente.")
        os._exit(0)

    def setup_tray_icon(self):
        icon = pystray.Icon("TunnManagment", image, "TunnManagment")
        icon.menu = pystray.Menu(
            pystray.MenuItem("Ver estado de las conexiones", self.validate_state_connxins),
            pystray.MenuItem("Exit", self.on_exit),
        )
        return icon

    def create_windows(self):
        try:
            if is_windows:
                import subprocess
                subprocess.run(f"{app_dir}/ui.tunnmanagment.munakdigital.exe", shell=True, text=True, stdout=subprocess.PIPE)
            else:
                Interactive(
                    f"open {app_dir}/ui.tunnmanagment.munakdigital.app",
                    name_conection="window"
                )
        except ValueError as e:
            print(e)

    def validate_state_connxins(self):
        window = Process(name="new_windows_config",target=self.create_windows)
        window.start()

if __name__ == "__main__":
    app = App()
