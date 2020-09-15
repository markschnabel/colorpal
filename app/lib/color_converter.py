class ColorConverter():
    def rgb_to_hex(self, rgb_arr):
        hex = "#{0:02x}{1:02x}{2:02x}".format(
            self.__clamp_rgb_value(rgb_arr[0]),
            self.__clamp_rgb_value(rgb_arr[1]),
            self.__clamp_rgb_value(rgb_arr[2])
        )

        return hex.upper()

    def __clamp_rgb_value(self, x):
        return max(0, min(x, 255))
