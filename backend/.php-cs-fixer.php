<?php
declare(strict_types=1);

use PhpCsFixer\Finder;

$rules = [
    '@PSR1'                  => true,
    '@PSR2'                  => true,
    '@PSR12'                 => true,
    'indentation_type'       => true,
    'array_indentation'      => true,
    'binary_operator_spaces' => [
        'default' => 'align_single_space_minimal',
    ],
    'trailing_comma_in_multiline' => [
        'elements' => ['arguments', 'arrays', 'match', 'parameters'],
    ],
    'no_trailing_comma_in_singleline' => true,
    'no_unused_imports'               => true,
    'single_quote'                    => [
        'strings_containing_single_quote_chars' => true,
    ],
    'method_chaining_indentation' => true,
    'blank_line_before_statement' => [
        'statements' => [
            'if',
            'for',
            'foreach',
            'while',
            'switch',
            'break',
            'continue',
            'return',
        ],
    ],
    'class_attributes_separation' => [
        'elements' => [
            'property'     => 'one',
            'method'       => 'one',
            'const'        => 'one',
            'trait_import' => 'one',
        ],
    ],
    'no_multiline_whitespace_around_double_arrow' => true,
    'trim_array_spaces'                           => true,
    'object_operator_without_whitespace'          => true,
    'braces_position'                             => [
        'functions_opening_brace' => 'same_line',
    ],
    'single_line_empty_body' => true,
    'no_extra_blank_lines'   => [
        'tokens' => [
            'attribute',
            'break',
            'case',
            'continue',
            'curly_brace_block',
            'default',
            'extra',
            'parenthesis_brace_block',
            'return',
            'square_brace_block',
            'switch',
            'throw',
            'use',
            'use_trait',
        ],
    ],
    'no_empty_phpdoc'              => true,
    'declare_strict_types'         => true,
    'blank_line_after_opening_tag' => false,
    'linebreak_after_opening_tag'  => true,
    'type_declaration_spaces'      => [
        'elements' => [
            'function',
            'property',
        ],
    ],
    'single_space_after_construct' => true,
];

$finder = Finder::create()->
    in([
        __DIR__ . '/app',
        __DIR__ . '/config',
        __DIR__ . '/database',
        __DIR__ . '/resources',
        __DIR__ . '/routes',
        __DIR__ . '/tests',
    ])->
        name('*.php')->
               notName('*.blade.php')->
                   ignoreDotFiles(true)->
        ignoreVCS(true);

$config = new PhpCsFixer\Config();
$config->registerCustomFixers([
]);

return $config->
    setFinder($finder)->
        setRules($rules)->
        setRiskyAllowed(true)->
        setUsingCache(true);
