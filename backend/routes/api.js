const express = require('express');
const router = express.Router();

//endpoint

router.post('/generate', (req, res ) => {
    try{
        const {prompt, language = 'python'} = req.body;
         
        //validate input
        if(!prompt || prompt.trim() === ''){
            return res.status(400).json({
                error: 'Prompt is required'
            });
        }

        //Mock code generation
        const mockCode = generateMockCode(prompt, language);

        //simulate API delay
        setTimeout(() => {
            res.json({
                code : mockCode,
                language : language,
                prompt : prompt,
                message : 'Code generated successfully'
            });
        }, 1000);

    }catch(error){
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        })
    }
});

//GET /api/languages
router.get('/languages', (req, res) => {
  res.json({
      languages: ['python', 'javascript', 'cpp'],
      default: 'python'
  });
});



//Mock code generation function

function generateMockCode(prompt, language){
    const lowerPrompt = prompt.toLowerCase();

    
    if (language === 'python') {
        if (lowerPrompt.includes('reverse') && lowerPrompt.includes('string')) {
          return `def reverse_string(s):\n    return s[::-1]\n\n# Example usage\nprint(reverse_string("hello"))  # Output: "olleh"`;
        }
        if (lowerPrompt.includes('fibonacci')) {
          return `def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\n# Example usage\nfor i in range(10):\n    print(fibonacci(i))`;
        }
        if (lowerPrompt.includes('factorial')) {
          return `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)\n\n# Example usage\nprint(factorial(5))  # Output: 120`;
        }
        if (lowerPrompt.includes('sort') || lowerPrompt.includes('array')) {
          return `def sort_array(arr):\n    return sorted(arr)\n\n# Example usage\nnumbers = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(sort_array(numbers))  # Output: [1, 1, 2, 3, 4, 5, 6, 9]`;
        }
        
        if (lowerPrompt.includes('palindrome')) {
          return `def is_palindrome(s):\n    s = s.lower().replace(" ", "")\n    return s == s[::-1]\n\n# Example usage\nprint(is_palindrome("racecar"))  # Output: True\nprint(is_palindrome("hello"))   # Output: False`;
        }
        
        if (lowerPrompt.includes('prime') || lowerPrompt.includes('check prime')) {
          return `def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\n# Example usage\nprint(is_prime(7))   # Output: True\nprint(is_prime(10))  # Output: False`;
        }
      
        return `# ${prompt}\ndef solution():\n    # Your code here\n    pass\n\n# Example usage\nresult = solution()\nprint(result)`;
      }

      // JavaScript examples
      if (language === 'javascript') {
        if (lowerPrompt.includes('reverse') && lowerPrompt.includes('string')) {
          return `function reverseString(str) {\n    return str.split('').reverse().join('');\n}\n\n// Example usage\nconsole.log(reverseString("hello")); // Output: "olleh"`;
        }
        if (lowerPrompt.includes('fibonacci')) {
          return `function fibonacci(n) {\n    if (n <= 1) return n;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}\n\n// Example usage\nfor (let i = 0; i < 10; i++) {\n    console.log(fibonacci(i));\n}`;
        }
        if (lowerPrompt.includes('sort') || lowerPrompt.includes('array')) {
          return `function sortArray(arr) {\n    return arr.sort((a, b) => a - b);\n}\n\n// Example usage\nconst numbers = [3, 1, 4, 1, 5, 9, 2, 6];\nconsole.log(sortArray(numbers)); // Output: [1, 1, 2, 3, 4, 5, 6, 9]`;
        }
        
        if (lowerPrompt.includes('palindrome')) {
          return `function isPalindrome(str) {\n    const cleaned = str.toLowerCase().replace(/\\s/g, '');\n    return cleaned === cleaned.split('').reverse().join('');\n}\n\n// Example usage\nconsole.log(isPalindrome("racecar")); // Output: true\nconsole.log(isPalindrome("hello"));   // Output: false`;
        }
        if (lowerPrompt.includes('prime') || lowerPrompt.includes('check prime')) {
          return `function isPrime(n) {\n    if (n < 2) return false;\n    for (let i = 2; i <= Math.sqrt(n); i++) {\n        if (n % i === 0) return false;\n    }\n    return true;\n}\n\n// Example usage\nconsole.log(isPrime(7));   // Output: true\nconsole.log(isPrime(10));  // Output: false`;
        }
       
        return `// ${prompt}\nfunction solution() {\n    // Your code here\n}\n\n// Example usage\nconst result = solution();\nconsole.log(result);`;
      }

      //C++ examples
      if (language === 'cpp') {
        if (lowerPrompt.includes('reverse') && lowerPrompt.includes('string')) {
          return `#include <iostream>\n#include <algorithm>\n#include <string>\nusing namespace std;\n\nstring reverseString(string s) {\n    reverse(s.begin(), s.end());\n    return s;\n}\n\nint main() {\n    string str = "hello";\n    cout << reverseString(str) << endl; // Output: olleh\n    return 0;\n}`;
        }
       
        return `// ${prompt}\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}`;
      }
    
      // Default fallback
      return `// ${prompt}\n// Code generation for: ${language}`;
    }
    
module.exports = router;






