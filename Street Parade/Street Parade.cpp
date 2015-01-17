#include<cstdio>
#include<iostream>
#include<vector>

using namespace std;

int main (void)
{
  int n, i = 0, min = 1, tmp = 0, cur = 0, cnt = 0;
  vector < int >left, right, down;
  while (scanf ("%d", &n))
    {
      if (n == 0)
        return 0;
      for (i = 0; i < n; i++)
        {
          cin >> cur;
          left.push_back (cur);
        }

      for (i = 0; i < n; i++)
        {
          cur = left[i];
          if (cur == min)
            {
              right.push_back (cur);
              min = right.back ();
              tmp = down.size ();
              while (tmp > 0)
                {
                  if (down.back () - right.back () == 1)
                    {
                      right.push_back (down.back ());
                      down.pop_back ();
                      min = right.back ();
                    }
                  min = right.back ();
                  tmp--;
                }
              min = right.back () + 1;
            }
          else
            {
              down.push_back (cur);
              if (right.empty ())
                {
                  min = 1;
                }
              else
                min = right.back () + 1;

              tmp = down.size ();
              while (tmp > 0 && !right.empty ())
                {
                  if (down.back () - right.back () == 1)
                    {
                      right.push_back (down.back ());
                      down.pop_back ();
                      min = right.back ();
                    }
                  min = right.back ();
                  tmp--;
                }
            }
        }

      if (down.size ())
        cout << "no\n";
      else
        cout << "yes\n";
      min = 1;
      tmp = 0;
      cur = 0;
      cnt = 0;
      left.clear ();
      right.clear ();
      down.clear ();
    }

  return 0;
}
