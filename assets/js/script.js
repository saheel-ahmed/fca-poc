const { createApp } = Vue

  createApp({
    data() {
      return {
        db: {
            priorities: [],
            enabler: []
        },
        objectiveMode: 'view',
        objective: {
            oIndex: 0,
            pIndex: 0,
            code: '',
            title: '',
            description: '',
            kpi: [],
            ini: [],
            result1: 0,
            result2: 0
        },
        enabler: {
            code: '',
            title: '',
            kpi: [],
            ini: []
        },
        demoKPI: {
            code: "P1SO1K1",
            title: "Integrated case management setup",
            description: "The KPI measures the percentage completion of Integrated Case Management set-up",
            pTitle: 'Advanced and unified case management',
            oTitle: 'Deploy ICM',
            tags: [
                { key: 'KPI type', value: 'Strategic', label: '(Strategic, Operational)' },
                { key: 'Measurement unit', value: '%', label: '' },
                { key: 'Targeted direction', value: 'Increase', label: '' },
                { key: 'Frequency', value: 'Monthly', label: '' },
                { key: 'Data source', value: 'Report', label: '' },
                { key: 'KPI owner', value: 'Supporting Services Sector', label: '' },
            ],
            data: [
                {
                    year: 2023,
                    quaters: [
                        { key: 'Q1', value: 20 },
                        { key: 'Q2', value: 40 },
                        { key: 'Q3', value: 60 },
                        { key: 'Q4', value: 80 }
                    ],
                    total: 0
                },
                {
                    year: 2024,
                    total: 100
                },
                {
                    year: 2025,
                    total: 100
                }
            ],
            challeneges: [
                {
                    title: 'Complete the Procument Process',
                    status: 'done'
                },
                {
                    title: 'User Acceptance challenge',
                    status: 'overdue'
                },
                {
                    title: 'Complete the Procument Process',
                    status: 'progress'
                }
            ],
            analysis: 'The KPI measures the percentage completion of Integrated Case Management set-up. Identify extension systems including document and file management, advanced collaboration and correspondence management and financial tracking and accountability. License management and Continuing Professional Development (CPD) management.',
            result1: 70,
            result2: 30
        },
        demoINI: {
            code: "P1SO1I1",
            title: "Initiatives",
            description: "Roll out and activate the Integrated case management system",
            pTitle: 'Advanced and unified case management',
            oTitle: 'Deploy ICM',
            tags: [
                { key: 'KPI type', value: 'Strategic', label: '(Strategic, Operational)' },
                { key: 'Measurement unit', value: '%', label: '' },
                { key: 'Targeted direction', value: 'Increase', label: '' },
                { key: 'Frequency', value: 'Monthly', label: '' },
                { key: 'Data source', value: 'Report', label: '' },
                { key: 'KPI owner', value: 'Supporting Services Sector', label: '' },
            ],
            budget: {
                project: '2,300,000 AED',
                spent: '300,000 AED'
            },
            accomplishment: 'The KPI measures the percentage completion of Integrated Case Management set-up. Identify extension systems including document and file management, advanced collaboration and correspondence management and financial tracking and accountability. License management and Continuing Professional Development (CPD) management.',
            analysis: 'The KPI measures the percentage completion of Integrated Case Management set-up. Identify extension systems including document and file management, advanced collaboration and correspondence management and financial tracking and accountability. License management and Continuing Professional Development (CPD) management.',
            result1: 70,
            result2: 30,
            status: 'Completed',
            milestones: [
                {
                    title: 'Complete the Procument Process',
                    status: 'done',
                    value: '100%'
                },
                {
                    title: 'User Acceptance challenge',
                    status: 'done',
                    value: '100%'
                },
                {
                    title: 'Complete the Procument Process',
                    status: 'progress',
                    value: '30%'
                }
            ],
            challeneges: [
                {
                    title: 'Complete the Procument Process',
                    status: 'done'
                },
                {
                    title: 'User Acceptance challenge',
                    status: 'overdue'
                },
                {
                    title: 'Complete the Procument Process',
                    status: 'progress'
                }
            ],
            risks: [
                {
                    title: 'Complete the Procument Process',
                    status: 'high'
                },
                {
                    title: 'User Acceptance challenge',
                    status: 'low'
                },
                {
                    title: 'Complete the Procument Process',
                    status: 'medium'
                }
            ]
        },
        demoDept: {
            code: "HR",
            title: "Human Resources",
            description: "Roll out and activate the Integrated case management system",
            budget: {
                project: '2,300,000 AED',
                spent: '300,000 AED'
            },
            accomplishment: 'The KPI measures the percentage completion of Integrated Case Management set-up. Identify extension systems including document and file management, advanced collaboration and correspondence management and financial tracking and accountability. License management and Continuing Professional Development (CPD) management.',
            analysis: 'The KPI measures the percentage completion of Integrated Case Management set-up. Identify extension systems including document and file management, advanced collaboration and correspondence management and financial tracking and accountability. License management and Continuing Professional Development (CPD) management.',
            result1: 70,
            result2: 30,
            accomplishments: [
                {
                    title: 'Accessories Here you can find the best computer accessor.',
                    status: 'done',
                    value: '100%'
                },
                {
                    title: 'Accessories Here you can find the best computer accessor.',
                    status: 'done',
                    value: '100%'
                },
                {
                    title: 'Accessories Here you can find the best computer accessor.',
                    status: 'progress',
                    value: '30%'
                }
            ],
            challeneges: [
                {
                    title: 'Complete the Procument Process',
                    status: 'done'
                },
                {
                    title: 'User Acceptance challenge',
                    status: 'overdue'
                },
                {
                    title: 'Complete the Procument Process',
                    status: 'progress'
                }
            ]
        }
      }
    },
    created () {
        this.fetchData();
    },
    methods: {
        fetchData : function () {
            let _self = this;
            $.getJSON('/data.json', function (response) {
                _self.db = response;
            });
        },
        fnAddObjective : function (pIndex) {
            this.objective.pIndex = pIndex;
            $('#objPopup').modal('show');
        },
        fnSaveObjective: function () {
            var pIndex = this.objective.pIndex;
            var newData = {
                "code": 'OBJ'+ (this.db.priorities[pIndex].objectives.length+1),
                "title": this.objective.title,
                "description": this.objective.description,
                "kpi": [],
                "ini": []
            };
            this.db.priorities[pIndex].objectives.push(newData);
            $('#objPopup').modal('hide');
            $.toaster({ message : 'Success added', title : 'Success', priority : 'success' });
            // rest objective
            this.objective = {
                oIndex: 0,
                pIndex: 0,
                code: '',
                title: '',
                description: '',
                kpi: [],
                ini: [],
                result1: 0,
                result2: 0
            };
        },
        fnViewObjective : function (pIndex, oIndex) {
            this.objective = this.db.priorities[pIndex].objectives[oIndex];
            this.objective.oIndex = oIndex;
            this.objective.pIndex = pIndex;
            this.objective.result1 = 0;
            this.objective.result2 = 0;
            var obj = this.objective;
            var totalQty = obj.kpi.length + obj.ini.length;
            var total = totalQty * 100;
            var actualSum = 0;
            obj.kpi.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            obj.ini.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            console.log('actualSum', actualSum);
            var rstPercent = Math.round( ( actualSum / total ) * 100 );
            console.log('rstPercent', rstPercent);
            this.objective.result1 = isNaN(rstPercent) ? 0 : rstPercent;
            this.objective.result2 = isNaN(rstPercent) ? 0 : (100 - rstPercent);

            $('#priorityPopup').modal('show');
        },
        fnCalc : function () {
            this.objective.result1 = 0;
            this.objective.result2 = 0;
            var obj = this.objective;
            var totalQty = obj.kpi.length + obj.ini.length;
            var total = totalQty * 100;
            var actualSum = 0;
            obj.kpi.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            obj.ini.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            console.log('actualSum', actualSum);
            var rstPercent = Math.round( ( actualSum / total ) * 100 );
            console.log('rstPercent', rstPercent);
            this.objective.result1 = isNaN(rstPercent) ? 0 : rstPercent;
            this.objective.result2 = isNaN(rstPercent) ? 0 : (100 - rstPercent);
        },
        checkPercentage: function(obj){
            //((D3+D4+H3+H4) ) / (4*100) * 100
            var totalQty = obj.kpi.length + obj.ini.length;
            var total = totalQty * 100;
            var actualSum = 0;
            obj.kpi.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            obj.ini.forEach( k => {
                actualSum += parseInt(k.actual);
            });
            var rstPercent = Math.round( ( actualSum / total ) * 100 )
            return (isNaN(rstPercent)? 0 : rstPercent) +'%';
        },
        fnAddKPI: function (type) {
            
            if (type == 'KPI') {
                var kpiLen = this.db.priorities[this.objective.pIndex].objectives[this.objective.oIndex].kpi.length;
                var newData = 
                {
                    "code": "KPI" + (kpiLen+1),
                    "title": "Title of KPI" + (kpiLen+1),
                    "description": "The KPI measures the percentage completion of Integrated Case Management set-up",
                    "expected": 99,
                    "actual": (Math.floor(Math.random() * 31) + 50)
                };
                this.db.priorities[this.objective.pIndex].objectives[this.objective.oIndex].kpi.push(newData);
            } else if (type == 'INIT') {
                var kpiLen = this.db.priorities[this.objective.pIndex].objectives[this.objective.oIndex].ini.length;
                var newData = {
                    "code": "INI" + (kpiLen+1),
                    "title": "Title of Initiative " + (kpiLen+1),
                    "description": "The KPI measures the percentage completion of Integrated Case Management set-up",
                    "expected": 99,
                    "actual": (Math.floor(Math.random() * 31) + 50)
                };
                this.db.priorities[this.objective.pIndex].objectives[this.objective.oIndex].ini.push(newData);
            }
            this.fnCalc();
        },
        fnRemoveKPI : function (kIndex,  targetObj){
            targetObj.splice(kIndex, 1);
            this.fnCalc();
        },
        fnViewEnabler: function(enbler) {
            this.enabler = enbler;
            $('#enablerPopup').modal('show');
        } 
    }
  }).mount('#app');

  $(document).ready(function(){

    var triangle = $('.triangle');
    var setBoarderWidth =  Math.round($(triangle).parent().width() / 2);
    var triangleCss = {
        'border': setBoarderWidth+'px solid transparent',
        'border-top': 0,
        'border-bottom': '80px solid rgb(231, 231, 231)'
    };
    $(triangle).css(triangleCss);

    $( window ).resize(function() {
        var setBoarderWidth =  $(triangle).parent().width() / 2;
        var triangleCss = {
            'border': setBoarderWidth+'px solid transparent',
            'border-top': 0,
            'border-bottom': '80px solid rgb(231, 231, 231)'
        };
        $(triangle).css(triangleCss);
    });

    

    $("#priorityPopup").on('show.bs.modal', function(){
        setTimeout(function(){
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        }, 400);
    });
    

  });

  

