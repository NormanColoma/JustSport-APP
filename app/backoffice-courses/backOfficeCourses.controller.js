/**
 * Created by Norman on 08/06/2016.
 */
/**
 * Back Office Sport Controller
 * @namespace BackOffice Courses
 */
angular
    .module('backOfficeModule')
    .controller('BackOfficeCoursesController', BackOfficeCoursesController);

    BackOfficeCoursesController.$inject = ['dialogService', 'formResetService', 'backOfficeSportService', 'loginService',
        'backOfficeEstabService','backOfficeCoursesService'];

    /**
     *
     * @namespace BackOfficeCoursesController
     * @desc Controller that manages all the operatiosn related to courses
     * @memberOf BackOffice Courses
     *
     */
    function BackOfficeCoursesController(dialogService,formResetService, backOfficeSportService, loginService,
                                         backOfficeEstabService,backOfficeCoursesService) {
        var vm = this;

        vm.courses = [];
        vm.currentCourses = [];
        vm.getCourses = getCourses;
        vm.getFullEstabs = getFullEstabs;
        vm.modifyValues = modifyValues;
        vm.updateCourse = updateCourse;

        getFullEstabs();

        /**
         * @name getCourses
         * @desc Get the courses from the specified estab, and push all of them to currentCourses array
         * @param id -> The id of the establishment
         * @param ev -> Event captured
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function getCourses(id,ev){
            vm.currentCourses = [];
            var dataDialog = {};
            for(var i=0;i<vm.courses.length;i++){
                if(vm.courses[i].establishmentId === parseInt(id)){
                    for(var j=0;j<vm.courses[i].rows.length;j++){
                        vm.currentCourses.push(vm.courses[i].rows[j]);
                    }
                }
            }

            if(vm.currentCourses.length === 0){
                dataDialog = {
                    title: '¡Sin resultados!', text: 'El establecimiento seleccionado no tiene cursos asignados todavía.',
                    aria: 'Search Courses Alert', textButton: 'Listo'
                };
                dialogService.showDialog(dataDialog, ev);
            }
        }

        /**
         * @name getEstabs
         * @desc Fetch all the establishments
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function getFullEstabs(){
            if(loginService.isLoggedIn()) {
                backOfficeEstabService.getFullEsts().then(function(data){
                    vm.fullEstabs = data;
                    vm.courses = backOfficeEstabService.getCourses();
                });
            }
        }

        function updateCourse(id,data,ev){

            backOfficeCoursesService.update(id,data).then(function(res){
                if(res){
                    modifyValues(id,data);
                }else{

                }
            });
        }

        function modifyValues(id,data){
            for(var i=0;i<vm.courses.length;i++){
                for(var j=0;j<vm.courses[i].rows.length;j++){
                    if(vm.courses[i].rows[j].id === id){
                        if(data.info !== undefined){
                            vm.courses[i].rows[j].info = data.info;
                        }
                        if(data.price !== undefined){
                            vm.courses[i].rows[j].price = data.price;
                        }
                        if(data.instructor !== undefined){
                            vm.courses[i].rows[j].instructor = data.instructor;
                        }
                    }
                }
            }
        }


    }