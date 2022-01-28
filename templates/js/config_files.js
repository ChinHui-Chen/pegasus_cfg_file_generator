
let vue_dashboard = new Vue({
    el: '#vue-dashboard',
    data: {
        all_outputs: {
            // file name
            file_name: "default",

            // Micros
            micros: {
                s_CreateCscAcqEnt: "AcqSystem1",
                s_SetAcqEntProcessingEnabled: "True",
                s_SetChannelNumber: "auto increment",
                s_SetAcqEntReference: "192",
                s_SetInputRange: "2000",
                s_SetDspLowCutFilterEnabled: "True",
                s_SetDspLowCutFrequency: "0.1",
                s_SetDspLowCutNumberTaps: "0",
                s_SetDspHighCutFilterEnabled: "True",
                s_SetDspHighCutFrequency: "8000",
                s_SetDspHighCutNumberTaps: "256",
                s_SetSubSamplingInterleave: "1",
                s_SetInputInverted: "True",
                s_SetNetComDataBufferingEnabled: "False",
                s_SetNetComDataBufferSize: "3000",
            },


            // Macros
            macros: {
                CreateCscAcqEnt: "AcqSystem1",
                SetAcqEntProcessingEnabled: "True",
                SetChannelNumber: "auto increment",
                SetAcqEntReference: "32000000",
                SetInputRange: "2000",
                SetDspLowCutFilterEnabled: "True",
                SetDspLowCutFrequency: "0.1",
                SetDspLowCutNumberTaps: "0",
                SetDspHighCutFilterEnabled: "True",
                SetDspHighCutFrequency: "500",
                SetDspHighCutNumberTaps: "256",
                SetSubSamplingInterleave: "16",
                SetInputInverted: "True",
                SetNetComDataBufferingEnabled: "False",
                SetNetComDataBufferSize: "3000",
            },

            // channels added
            macro_channels_added: {},
            micro_channels_added: {},

            // channels added (json string)
            macro_channels_added_json_string: "{ \"Amg-1Ld1\": \"12\" }",
            micro_channels_added_json_string: "{ \"sAmg-1Ld1\": \"16\" }" 
        },


        // Console
        console_output: "",

        // Add channel
        macro_channel_name: "AHipp-3Ld",
        macro_n_channels: "12",
        micro_channel_name: "sAHipp-3Ld1",
        micro_n_channels: "16",

    },
    methods: {
        download_config_file: function () {

            this.all_outputs.macro_channels_added = JSON.parse(this.all_outputs.macro_channels_added_json_string);
            this.all_outputs.micro_channels_added = JSON.parse(this.all_outputs.micro_channels_added_json_string);
            /*
            Send an Async request to download the config file.
             */
            let rq = new XMLHttpRequest();

            rq.onreadystatechange = function (vm) {
                if (this.readyState === XMLHttpRequest.DONE) {
                    if (this.status === 200) {
                        let blob = new Blob([this.responseText]);
                        // IE hack;
                        if (window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveBlob(blob, vm.all_outputs.file_name + ".cfg");
                        }
                        else {
                            let a = window.document.createElement("a");
                            a.href = window.URL.createObjectURL(blob, {type: "text/plain"});
                            a.download = vm.all_outputs.file_name + ".cfg";
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        }
                    } else {
                        console.log("Not able to download the requested cfg file.")
                    }
                }
            }.bind(rq, this);
            rq.open("POST", "/download_config_file", true);
            rq.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
            rq.send(
                "all_outputs=" + JSON.stringify(this.all_outputs)
            );
        },

        add_micro_channel: function () {
            /*
            Add a micro or macro channel
             */
            smicro = JSON.parse(this.all_outputs.micro_channels_added_json_string);
            smicro[this.micro_channel_name] = this.micro_n_channels;
            this.all_outputs.micro_channels_added_json_string = JSON.stringify(smicro);
        },

        undo_micro_channel: function () {
            /*
            Add a micro or macro channel
             */
            smicro = JSON.parse(this.all_outputs.micro_channels_added_json_string);
            delete smicro[this.micro_channel_name];
            this.all_outputs.micro_channels_added_json_string = JSON.stringify(smicro);

        },

        add_macro_channel: function () {
            /*
            Add a macro or macro channel
             */
            smacro = JSON.parse(this.all_outputs.macro_channels_added_json_string);
            smacro[this.macro_channel_name] = this.macro_n_channels;
            this.all_outputs.macro_channels_added_json_string = JSON.stringify(smacro);

        },

        undo_macro_channel: function () {
            /*
            Add a macro or macro channel
             */
            smacro = JSON.parse(this.all_outputs.macro_channels_added_json_string);
            delete smacro[this.macro_channel_name];
            this.all_outputs.macro_channels_added_json_string = JSON.stringify(smacro);

        },

        output_to_console: function (channel_name, n_channels, delete_ch) {
            /*
            Console ouput
             */
            if (!delete_ch){
                this.console_output += "\n" + "Channel added: " + channel_name + "  " + "n_channles: " + n_channels + "\n";
            }
            else {
                this.console_output += "\n" + "Channel deleted: " + channel_name + "\n";
            }
        },
        add_ekg: function(){
            smacro = JSON.parse(this.all_outputs.macro_channels_added_json_string);
            smacro["EKG1"] = 1 ;
            smacro["LEOG1"] = 1 ;
            smacro["REOG1"] = 1 ;
            smacro["EMG1"] = 1 ;
            smacro["EMG2"] = 1 ;
            smacro["R1"] = 1 ;
            smacro["R2"] = 1 ;
            smacro["R3"] = 1 ;
            smacro["R4"] = 1 ;
            smacro["R5"] = 1 ;
            smacro["R6"] = 1 ;
            smacro["R7"] = 1 ;
            smacro["R8"] = 1 ;
            smacro["R9"] = 1 ;
            smacro["R10"] = 1 ;
            this.all_outputs.macro_channels_added_json_string = JSON.stringify(smacro);
        },

        load_car_30: function(){
             // Load CAR30 config
             smacro = {};
             smicro = {};

             smacro["Amg-1Ld1"] = 6 ;
             smacro["AHipp-3Ld1"] = 6 ;
             smacro["MHipp-5Ld1"] = 6 ;
             smacro["SFGR-9Ld1"] = 14 ;
             smacro["MFOG-11Ld1"] = 14 ;
             smacro["IFCG-13Ld1"] = 6 ;
             smacro["Amg-2Rd1"] = 6 ;
             smacro["AHipp-4Rd1"] = 6 ;
             smacro["MHipp-6Rd1"] = 6 ;
             smacro["SFGR-10Rd1"] = 14 ;
             smacro["MFOG-12Rd1"] = 14 ;
             smacro["IFCG-14Rd1"] = 6 ;

             smacro["EKG1"] = 1 ;
             smacro["LEOG1"] = 1 ;
             smacro["REOG1"] = 1 ;
             smacro["EMG1"] = 1 ;
             smacro["EMG2"] = 1 ;
             smacro["R1"] = 1 ;
             smacro["R2"] = 1 ;
             smacro["R3"] = 1 ;
             smacro["R4"] = 1 ;
             smacro["R5"] = 1 ;
             smacro["R6"] = 1 ;
             smacro["R7"] = 1 ;
             smacro["R8"] = 1 ;
             smacro["R9"] = 1 ;
             smacro["R10"] = 1 ;
             smacro["Dummy-1"] = 9; //119-128

             //micro
             smicro["sAmg-1Ld1"] = 16 ;
             smicro["sAHipp-3Ld1"] = 16 ;
             smicro["sMHipp-5Ld1"] = 16 ;
             smicro["sIFCG-13Ld1"] = 16 ;
             smicro["sAmg-2Rd1"] = 16 ;
             smicro["sAHipp-4Rd1"] = 16 ;
             smicro["sMHipp-6Rd1"] = 16 ;
             smicro["sIFCG-14Rd1"] = 16 ;

             this.all_outputs.macro_channels_added_json_string = JSON.stringify(smacro);
             this.all_outputs.micro_channels_added_json_string = JSON.stringify(smicro);
           
        }
    },
    filters: {
        pretty: function(value) {
              return JSON.stringify(JSON.parse(value), null, 2);
            }
    }

});
