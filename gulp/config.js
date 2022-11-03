const packageSettings = require('../package.json')
const ssi = require('browsersync-ssi');
const p = require('path');
const pug = require('pug');
// **********************************************
// 프로젝트별 경로 세팅 필요
// **********************************************

// 퍼그 빌드 나눔 갯수
const PUG_SEPARATED_LENGTH = 10;
// 사스 빌드 나눔 갯수
const SCSS_SEPARATED_LENGTH = 10;

// 프로젝트 폴더 이름
const project_name = packageSettings.name;

// www 컨텐츠 폴더 경로 (프로젝트 마다 상세 경로 세팅)
const path_www = {
    project_name: `${project_name}`,
    pathSettingHtml: '/',
    NODE_ENV: process.env.NODE_ENV,
    // pug 에서 사용할 변수를 세팅 할 수 있음
}
// build 컨텐츠 폴더 경로 (폴더 변경이 필요할 때 세팅 - 변경 필요 없으면 위 기본 경로 그대로 복사)
const path_build = {
    project_name: `${project_name}`,
    pathSettingHtml: '../../',
    NODE_ENV: process.env.NODE_ENV,
    // 위에서 선언한 변수를 build 시에 변경 할 수 있음
}


// **********************************************
// gulp 구동 관련 환경 세팅 (필요에 따라 커스터 마이징)
// **********************************************

// gulp 기본 경로 설정
const project = {
    // 기본 경로
    default: {
        src: 'dev',
        dest: 'www',
        build: 'build/build'
    },

    // 무시 경로
    ignore: {
        file: '!dev/**/{_*,_*/**}',
        doc: '!dev/_src/doc/*',
        deploy: '!www/sass_maps/**/*'
    }
};

// gulp 상세 경로 설정
const path = {
    // pug 경로
    pug: {
        src: {
            pug_page: [
                `${project.default.src}/**/*.pug`,
                `!${project.default.src}/cl.pug`,
                `${project.ignore.file}`,
                `${project.ignore.doc}`,
            ],
            pug_codinglist: [
                `${project.default.src}/cl.pug`,
            ]
        },
        watch: {
            pug_page: [
                `${project.default.src}/**/*.pug`,
                `!${project.default.src}/_codinglist/**/*.pug`,
                `!${project.default.src}/_src/**/*.pug`,
                `!${project.default.src}/cl.pug`,
            ],
            pug_codinglist: [
                `${project.default.src}/_codinglist/**/*.pug`,
                `${project.default.src}/cl.pug`,
            ],
            pug_src: [
                `${project.default.src}/_src/**/*.pug`,
                `!${project.default.src}/_src/doc/*.pug`,
            ],
        },
    },

    // sass 경로
    sass: {
        src: {
            sass_category: [
                `${project.default.src}/**/*.scss`,
                `${project.ignore.file}`,
                `${project.ignore.doc}`,
            ]
        },
        watch: {
            sass_category: [
                `${project.default.src}/**/*.scss`,
                `!${project.default.src}/**/_*.scss`,
            ],
            sass_src: [
                `${project.default.src}/**/_*.scss`,
            ],
        },
    },

    // js 경로
    js: {
        src: [
            `${project.default.src}/**/*.js`,
            `${project.ignore.file}`
        ],
        watch: [
            `${project.default.src}/**/*.js`,
        ],
    },

    // images 경로
    images: {
        src: [
            `${project.default.src}/**/*.{jpg,png,gif,svg}`,
            `${project.ignore.file}`,
            `${project.ignore.doc}`,
        ],
        watch: [
            `${project.default.src}/**/*.{jpg,png,gif,svg}`,
        ],
    },

    // etc 경로 (필요 항목 추가하기)
    etc: {
        src: [
            `${project.default.src}/**/*.{css,mp4,webm,html,eot,ttf,woff,woff2,json,pdf}`,
            `${project.ignore.file}`,
            `${project.ignore.doc}`,
        ],
        watch: [
            `${project.default.src}/**/*.{css,mp4,webm,html,eot,ttf,woff,woff2,json,pdf}`
        ],
    },

    dest: `${project.default.dest}`,
    build: `${project.default.build}`,

    // clean 경로
    clean: {
        dest: `${project.default.dest}/`,
        build: `${project.default.build}/`,
        unnecessary: [
            `${project.default.build}/sass_maps/`,
            `${project.default.build}/css/sass_maps/`
        ],
        build_unnecessary: [
            `${project.default.build}/css_partials/`
        ],
    },

    // 스프라이트 경로
    sprite: {
        src:{
            sprite_mobile: "dev/images/sprite_mobile/**/*",
            sprite_pc: "dev/images/sprite_pc/**/*"
        },
        dest:{
            sprite_img_mobile: "dev/images/common",
            sprite_css_mobile: "dev/_src/_scss/_sprite",
            sprite_img_pc: "dev/images/common",
            sprite_css_pc: "dev/_src/_scss/_sprite"
        },
        mobile: {
            imgPath: "../images/common/sprite_mobile.png",
            imgName: "sprite_mobile.png",
            cssName: "_sprite_mobile.scss",
            retinaSrcFilter: "dev/images/sprite_mobile/*@2x.png",
            retinaImgPath: "../images/common/sprite_mobile@2x.png",
            retinaImgName: "sprite_mobile@2x.png"
        },
        pc: {
            imgPath: "../images/common/sprite_pc.png",
            imgName: "sprite_pc.png",
            cssName: "_sprite_pc.scss"
        }
    },

    // 웹서버 설정
    browserSyncOption: {
        notify: false,
        port: packageSettings.config.port || 8888,
        ghostMode: false,
        ui: {
            port: 3001,
        },
        logFileChanges: true,
        open: false,
        server: {
            baseDir: `${project.default.dest}/`,
            index: '/cl.html',
            middleware: ssi({
                baseDir: `${p.resolve(__dirname, '../')}/${project.default.dest}/`,
                ext: '.html'
            })
        }
    },

    // 불필요한 파일 백업 방지
    backup:[
        '**/*',
        '!node_modules',
        '!node_modules/**/*',
        '!__etribe_ux',
        '!__etribe_ux/**/*',
        '!www',
        '!www/',
        '!www/**/*',
        '!build',
        '!build/',
        '!build/**/*'
    ],

    // FTP 업로드 설정
    ftpOptions: {
        user: "etraux",
        pass: "dlxmfkdlqmux",
        host: "uxdev.etribe.co.kr",
        remotePath: `/uxdev.etribe.co.kr/${path_www.project_name}`
    },
    ftpPath: {
        ignore: [
            `${project.default.build}/**/*`,
            `${project.ignore.deploy}`
        ]
    }
}

// pug -> html 변환 옵션값 세팅
// https://pugjs.org/api/reference.html
const pugFilters = {
    code: function (text) {
        const NODE_ENV = process.env.NODE_ENV;

        let transformText = '';
        if (NODE_ENV === 'development') transformText = '<pre>\n' + text + '\n</pre>';
        if (NODE_ENV === 'production') transformText = '<xmp>' + pug.render(text) + '</xmp>';

        return `
                <div class="et--component-view">
                    ${pug.render(text)}
                </div>
                <div class="et--component-code">
                    <div class="options">
                        <button class="btn-copy" type="button">
                            <span>COPY</span>
                        </button>
                        <div class="toast-copy">
                            <span>copied!</span>
                        </div>
                    </div>
                    <div class="et--component-code-box">
                        ${transformText}
                    </div>
                </div>
                `;
    }
};

const pugOptions = {
    development: {
        basedir: 'dev',
        doctype: 'html',
        pretty: true,
        self: true,
        // verbose: true,
        locals: path_www,
        filters: pugFilters
    },
    build: {
        basedir: 'dev',
        doctype: 'html',
        pretty: true,
        self: true,
        verbose: true,
        locals: path_build,
        filters: pugFilters
    }
}

// pug -> html 변환 옵션값 세팅
// https://www.npmjs.com/package/js-beautify
const beautifyOptions = {
    html: {
        "indent_size": 2,
        "indent_char": " ",
        // "indent_with_tabs": true,
        "eol": "\n",
        "end_with_newline": true,
        "preserve_newlines": true,
        "max_preserve_newlines": 10,
        "indent_inner_html": false,
        "brace_style": "collapse",
        "wrap_line_length": 0,
        "wrap_attributes": "auto",
        "inline": ['br'],
        "unformatted": ['pre', 'code']
        // "extra_liners": ['-->']
    },
    css: {}
};

// sass -> css 변환 옵션값 세팅
// https://www.npmjs.com/package/clean-css
const cleancssOptions = {
    // 압축 버전
    minify: {
        compatibility: 'ie9',
        format : ' beautify '
    },

    // 가독성 버전
    normal : {
        compatibility: ('ie9', {
            properties: {
                urlQuotes: true
            }
        }),
        level: {
            1: {
                all: false
            }
        },
        format: 'keep-breaks'
    }
};

const banner = [
    "<!-- 상단 영역에 특정 소스가 필요할 때 세팅 -->",
    "<!-- 상단 영역에 특정 소스가 필요할 때 세팅 -->",
    "<!-- 상단 영역에 특정 소스가 필요할 때 세팅 -->",
    ""
].join("\n");

module.exports = { pugOptions, beautifyOptions, cleancssOptions, project, path, banner, PUG_SEPARATED_LENGTH, SCSS_SEPARATED_LENGTH};
