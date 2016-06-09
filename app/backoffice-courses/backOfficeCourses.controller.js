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

        vm.backToList = backToList;
        vm.course = null;
        vm.courses = [];
        vm.currentCourses = [];
        vm.deleteCourse = deleteCourse;
        vm.getCourse = getCourse;
        vm.getCourses = getCourses;
        vm.getFullEstabs = getFullEstabs;
        vm.modifyValues = modifyValues;
        vm.updateCourse = updateCourse;

        getFullEstabs();

        function backToList(){
            vm.selectedC = null;
            vm.selectedEst = null;
            vm.selectedCourse = null;
            vm.currentCourses = [];
        }

        /**
         * @name deleteCourse
         * @desc Looks up the course into courses array and deletes it
         * @param id-> Id of the course
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function deleteCourse(id,ev){
            backOfficeCoursesService.deleteCourse(id).then(function(res){
                if(res) {
                    for (var i = 0; i < vm.courses.length; i++) {
                        for (var j = 0; j < vm.courses[i].rows.length; j++) {
                            if (vm.courses[i].rows[j].id === parseInt(id)) {
                                vm.courses[i].rows.splice(j,1);
                            }
                        }
                    }
                }else{

                }
            });
        }

        /**
         * @name getCourse
         * @desc Looks up the course into courses array and sets course property
         * @param id-> Id of the course
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function getCourse(id){
            for(var i=0;i<vm.courses.length;i++) {
                for (var j = 0; j < vm.courses[i].rows.length; j++) {
                    if (vm.courses[i].rows[j].id === parseInt(id)) {
                        vm.course = vm.courses[i].rows[j];
                        vm.selectedC = angular.copy(vm.courses[i].rows[j]);
                    }
                }
            }
        }
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

        /**
         * @name updateCourse
         * @desc Update the specified course
         * @param id-> Id of course
         * @param data-> Data of course to be updated
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function updateCourse(id,data,ev){
            var d = {info: data.info,instructor: data.instructor,price:data.price};
            var dataDialog={};
           backOfficeCoursesService.update(id,d).then(function(res){
                if(res){
                    modifyValues(id,d);
                    dataDialog = {
                        title: '¡Curso Actualizado!', text: 'La información del curso ha sido actualizada.',
                        aria: 'Course Updated Alert', textButton: 'Listo'
                    };
                    backToList();
                    dialogService.showDialog(dataDialog, ev);
                }else{
                    dataDialog = {
                        title: '¡Error!', text: 'Se ha producido un error durante la actualización. Por favor, inténtalo de nuevo.',
                        aria: 'Course Updated Failed Alert', textButton: 'Listo'
                    };
                    dialogService.showDialog(dataDialog, ev);
                }
            });
        }

        /**
         * @name modifyValues
         * @desc Looks up for the course and modifies its values
         * @param id-> Id of the course
         * @data data-> New values of the course
         * @memberOf BackOffice Estabs.BackOfficeCoursesController
         * @returns {void}
         */
        function modifyValues(id,data){
            getCourse(id);
            if(data.info !== undefined){
                vm.course.info = data.info;
            }
            if(data.price !== undefined){
                vm.course.price = data.price;
            }
            if(data.instructor !== undefined){
                vm.course.instructor = data.instructor;
            }
        }


    }