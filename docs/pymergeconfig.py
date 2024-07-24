# python script to merge multiple configs together
# WARNING: this does not preserve any Kconfig rules
# after using this script, use menuconfig to clean it up
# here are the rules of this script:
#   all new config values are added
#   if values are the same, do nothing
#   Y > M > N (config with higher value wins)
#   if numbers or strings are different, prompt user

import sys
from datetime import datetime

class MergeConfig:
    def __init__(self, config_file_list):
        self.config_file_list = config_file_list
        self.timestamp_string = datetime.now().strftime('%Y%m%d_%H%M%S')
        self.config_dict = {}

    def _update_config(self, name, new_value):
        old_value = self.config_dict[name]
        if old_value == new_value:
            pass
        elif old_value == 'y':
            pass
        elif old_value == 'n' or old_value == 'm':
            if new_value == 'm' or new_value == 'y':
                self.config_dict[name] = new_value
        else:
            print(f'user input needed for {name}, options: ')
            print(f'(1) (old value) : {old_value}')
            print(f'(2) (new value) : {new_value}')
            while True:
                x = input('select 1 or 2: ')
                if x == '1':
                    self.config_dict[name] = old_value
                    break
                elif x == '2':
                    self.config_dict[name] = new_value
                    break
                else:
                    pass

    def load_configs(self):
        for config_file in self.config_file_list:
            with open(config_file, 'r') as f:
                lines = [line.strip() for line in f if 'CONFIG' in line]

            for line in lines:
                if '#' == line[0]:
                    config_name = line.split()[1]
                    config_value = 'n'
                elif '=' in line:
                    #print(line)
                    [config_name, config_value] = line.split('=', 1)
                else:
                    print(line)

                if config_name not in self.config_dict:
                    self.config_dict[config_name] = config_value
                else:
                    self._update_config(config_name, config_value)

    def save_config(self):
        with open(f'update_{self.timestamp_string}.config', 'w') as f:
            for (config_name, config_value) in self.config_dict.items():
                if config_value == 'n':
                    f.write(f'# {config_name} is not set')
                else:
                    f.write(f'{config_name}={config_value}')
                f.write('\n')

if __name__ == '__main__':
    # config_file_list = ['test_old.config', 'test_new.config']
    config_file_list = sys.argv[1:]
    mc = MergeConfig(config_file_list)
    mc.load_configs()
    mc.save_config()
